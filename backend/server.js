const express = require('express');
const prisma = require('./src/prisma_instance')
const cors= require('cors');
const fs= require("fs");
const path = require("path");
const ffmpeg= require("fluent-ffmpeg");

// Configurar Express
const app = express();
const port = 3000;

app.use(cors({
    // origin: 'http://192.168.50.129:5173'
    origin: 'http://192.168.137.1:5173'
}))

// Usar JSON como formato de cuerpo de las peticiones
app.use(express.json());


//Obtener las rutas de las miniaturas de los capitulos
//req.body[0] obtiene una URL relativa con el nombre de la carpeta
//y subcarpetas que contienen las imagenes

app.post('/getThumbnails', (req, res) => {
    const thumbnailsPath= "../public/thumbnails"+req.body[0]+"/";

    fs.readdir(thumbnailsPath, (err, thumbnailsFiles) => {
        if (err){
            console.error("Error al leer videos:", err);
            return res.status(500).json({error: "Error al leer la carpeta de thumbnails"});
        }

        const mediaFiles= thumbnailsFiles
        .filter(file => file.endsWith(".jpg"))
        .map(file => `public/thumbnails${req.body[0]}/${file}`);

        res.json({
            mediaFiles
        });
    });
});

app.post('/getVideos', (req, res) => {
    const videosPath= "../public/videos"+req.body[0]+"/";

    fs.readdir(videosPath, (err, videosFiles) => {
        if (err){
            console.error("Error al leer videos:", err);
            return res.status(500).json({error: "Error al leer la carpeta de videos"});
        }

        const mediaFiles= videosFiles
        .filter(file => file.endsWith(".mp4"))
        .map(file => `public/videos${req.body[0]}/${file}`);

        res.json({
            mediaFiles
        });
    });
});

/**
 * Crear miniaturas de los videos que vienen en la ruta relativa req.body[0]
 */

app.post('/addNewAnime', async (req, res) => {

    const { title, chapters, description, poster, folder_url }= req.body;

    try{
        const result= await prisma.$transaction(async (tx) => {
            const anime = await tx.animes.create({
                data: {
                    title: title,
                    description: description,
                    chapters: Number(chapters),
                    poster: poster,
                },
            });

            const chapter= await tx.anime_chapters.create({
                data: {
                    video_url: folder_url,
                    id_anime: anime.id_anime,
                }
            });
            return { anime, chapter };
        });

    res.status(200).json({messaje: "Anime insertado correctamente", anime: result});
    } catch (error) {
        console.error("Error intentando crear el anime", error)
        res.status(500).json({error: "Error al crear el anime"});
    }finally{
        await prisma.$disconnect();
    }

    const videosPath = path.resolve('../public/videos'+folder_url);
    const thumbnailsPath = path.resolve('../public/thumbnails'+folder_url);

    if(!fs.existsSync(thumbnailsPath)){
        fs.mkdirSync(thumbnailsPath, { recursive: true});
    }

    fs.readdir(videosPath, async (err, files) => {
        if (err) {
            console.log("error: "+err)
            return res.status(500).json({ error: 'No se pudo leer el directorio' });
        }

        const mp4Files = files.filter(file => file.endsWith('.mp4'));
        const filesWithThumbnails = await Promise.all(
            mp4Files.map(async (file) => {
                const videoFilePath = path.join(videosPath, file);
                const thumbnailFileName= file.replace(".mp4", ".jpg");
                const thumbnailFilePath= path.join(thumbnailsPath, thumbnailFileName);

                if (!fs.existsSync(thumbnailFilePath)){
                    try{
                        await generateThumbnail(videoFilePath, thumbnailFilePath);
                    } catch(err){
                        console.error(`Error generando la miniatura para ${file}`, err)
                    }
                }

                return {
                    video: file,
                    thumbnail: `/thumbnails/${thumbnailFileName}`,
                };
            })
        )
    });
});

/*Generar las miniaturas*/
const generateThumbnail = (videoPath, thumbnailPath) => {
    return new Promise((resolve, reject) => {
        ffmpeg(videoPath)
        .screenshots({
            timestamps: [1320],
            filename: path.basename(thumbnailPath),
            folder: path.dirname(thumbnailPath),
            size: "300x200",
        })
        .on("end", resolve)
        .on("error", reject);
    });
};

//Obtener los datos de la tabla animes
app.get('/animes', async (req, res) => {
    try{
        const animes= await prisma.animes.findMany({
            select:{
                id_anime: true,
                title: true,
                chapters: true,
                poster: true
            }
        });
        res.status(200).json(animes);
    } catch(error){
        res.status(500).json({ error: 'Error al obtener animes', message: error.message });
        console.log("error: "+error)
    } finally{
        await prisma.$disconnect()
    }
})

//obtener el id de un anime seleccionado
app.post('/animeSelected', async (req, res) => {
    try{
        const animes= await prisma.animes.findMany({
            select: {
                title: true,
                description: true,
                chapters: true,
                poster: true,
                anime_chapters: {
                    select: {
                        id_anime_chapters: true,
                        video_url: true,
                    },
                },  
            },
            where: {
                id_anime: req.body[0],
            },
        });
        res.status(200).json(animes);
    } catch(error){
        res.status(500).json({ error: 'Error al obtener animes: /animeSelected', message: error.message });
        console.log("error: "+error)
    } finally{
        await prisma.$disconnect()
    }
});

app.post('/AnimeName', async (req, res) => {
    try{
        const animeName= await prisma.animes.findMany({
            select:{
                title: true,
            },
            where: {
                id_anime: req.body[0],
            },
        });
        res.status(200).json(animeName);
    } catch(error){
        res.status(500).json({ error: 'Error al obtener el nombre del anime: /AnimeName', message: error.message });
        console.log("error: "+error)
    } finally{
        await prisma.$disconnect()
    }
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor escuchando en http://0.0.0.0:${port}`);
});
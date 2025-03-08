-- CreateTable
CREATE TABLE "animes" (
    "id_anime" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "chapters" INTEGER,
    "poster" TEXT
);

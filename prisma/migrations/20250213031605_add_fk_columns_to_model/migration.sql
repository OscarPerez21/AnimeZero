-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_anime_chapters" (
    "id_anime_chapters" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_anime" INTEGER,
    "video_url" TEXT,
    "view_state" INTEGER,
    CONSTRAINT "anime_chapters_id_anime_fkey" FOREIGN KEY ("id_anime") REFERENCES "animes" ("id_anime") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_anime_chapters" ("id_anime", "id_anime_chapters", "video_url", "view_state") SELECT "id_anime", "id_anime_chapters", "video_url", "view_state" FROM "anime_chapters";
DROP TABLE "anime_chapters";
ALTER TABLE "new_anime_chapters" RENAME TO "anime_chapters";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

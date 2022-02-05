-- Up
CREATE TABLE IF NOT EXISTS "tbl_words" (
  [id] INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  [word] NVARCHAR(160) UNIQUE NOT NULL,
  [approved] INTEGER NOT NULL DEFAULT 0,
  [created_at] DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  [updated_at] DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS "tbl_guesses" (
  [wordId] INTEGER NOT NULL,
  [guessId] INTEGER NOT NULL,
  [rowIndex] INTEGER NOT NULL,
  [created_at] DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(wordId) REFERENCES tbl_words(id),
  FOREIGN KEY(guessId) REFERENCES tbl_words(id)
);
CREATE INDEX tbl_words_word_idx ON tbl_words(word);
CREATE INDEX tbl_guesses_wordId_idx ON tbl_guesses(wordId);
CREATE INDEX tbl_guesses_guessId_idx ON tbl_guesses(guessId);
-- Down
DROP TABLE "tbl_words";
DROP TABLE "tbl_guesses";
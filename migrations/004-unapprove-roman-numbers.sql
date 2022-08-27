-- Up
UPDATE tbl_words SET approved = 0 WHERE word LIKE '%xx%';
UPDATE tbl_words SET approved = 0 WHERE word LIKE '%ii%';

-- Down
UPDATE tbl_words SET approved = 1 WHERE word LIKE '%xx%';
UPDATE tbl_words SET approved = 1 WHERE word LIKE '%ii%';
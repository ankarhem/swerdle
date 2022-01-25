import sqlite from 'better-sqlite3';
import wordlist from './ordlista_5.json';

const db = new sqlite('./db/db.sqlite3', { verbose: console.log });

const schema = `
CREATE TABLE IF NOT EXISTS words(
    id INTEGER NOT NULL PRIMARY KEY,
    word TEXT NOT NULL,
    UNIQUE(word)
);

CREATE TABLE IF NOT EXISTS invalidGuesses(
  id INTEGER NOT NULL PRIMARY KEY,
  guess TEXT NOT NULL,
  amount INTEGER DEFAULT 1,
  UNIQUE(guess)
);
`;

db.exec(schema);

// TODO: Use some migrations system instead
const populateWords = wordlist
	.map((word) => `INSERT OR IGNORE INTO words (word) VALUES ('${word}');`)
	.join('\n');

db.exec(populateWords);

export default db;

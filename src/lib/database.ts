import sqlite from 'better-sqlite3-helper';

const db = sqlite({
	path: './db/sqlite3.db', // this is the default
	readonly: false, // read only
	fileMustExist: false, // throw error if database not exists
	WAL: true, // automatically enable 'PRAGMA journal_mode = WAL'
	migrate: {
		// disable completely by setting `migrate: false`
		force: false, // set to 'last' to automatically reapply the last migration-file
		table: 'migration', // name of the database table that is used to keep track
		migrationsPath: './migrations' // path of the migration-files
	},
	// verbose: console.log
});

export default db;

import db from '$lib/database';

/** @type {import('@sveltejs/kit').RequestHandler} */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function get() {
	const firstDay = '2022-01-24T23:59:59.999Z';
	const date = new Date();

	// get diff in days
	const diff = Math.floor((date.getTime() - new Date(firstDay).getTime()) / (1000 * 60 * 60 * 24));

	const wordQuery = db.prepare('SELECT id, word FROM words LIMIT 1 OFFSET ?');
	const row = wordQuery.get(diff);
	console.log(row);
	return {
		status: 200,
		body: {
			id: row.id,
			word: row.word
		}
	};
}

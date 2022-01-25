import db from '$lib/database';

interface Params {
	word: string;
}

/** @type {import('@sveltejs/kit').RequestHandler} */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function get({ params }: { params: Params }) {
	if (!params.word) {
		return {
			status: 400,
			body: {
				error: 'Missing required param: `word`'
			}
		};
	}

	const wordQuery = db.prepare('SELECT id, word FROM words where word = ?');
	const row = wordQuery.get(params.word);

	if (!row) {
		const guessQuery = db.prepare('SELECT id, guess FROM invalidGuesses where guess = ?');
		if (!guessQuery.get(params.word)) {
			const insert = db.prepare('INSERT INTO invalidGuesses (guess) VALUES (?)');
			insert.run(params.word);
		} else {
			const update = db.prepare('UPDATE invalidGuesses SET amount = amount + 1 WHERE guess = ?');
			update.run(params.word);
		}
		return {
			status: 404,
			body: {
				message: 'Word not found'
			}
		};
	}

	return {
		status: 200,
		body: {
			message: 'Word found'
		}
	};
}

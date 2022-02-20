import db from '$lib/database';
import { getCurrentWordRow } from '$lib/validate';

interface Distribution {
	rowIndex: number;
	count: number;
}

/** @type {import('@sveltejs/kit').RequestHandler} */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function get() {
	const currentWord = getCurrentWordRow();

	const wonGamesPerRowIndex = db.query<Distribution>(
		'SELECT rowIndex, count(created_at) AS count FROM tbl_guesses WHERE guessId = wordId AND wordId = ? GROUP BY rowIndex',
		currentWord.id
	);
	const totalWon = wonGamesPerRowIndex.reduce((acc, curr) => {
		return acc + curr.count;
	}, 0);

	const startedGames = db.query<Distribution>(
		'SELECT created_at FROM tbl_guesses WHERE rowIndex = 0 AND wordId = ?',
		currentWord.id
	);

	const distribution = Array.from({ length: 6 }, (_, i) => {
		return { rowIndex: i, count: 0 };
	});
	wonGamesPerRowIndex.forEach((row) => {
		distribution[row.rowIndex] = row;
	});

	return {
		status: 200,
		body: {
			word: currentWord.word,
			distribution: distribution,
			total: {
				won: totalWon,
				played: startedGames.length
			}
		}
	};
}

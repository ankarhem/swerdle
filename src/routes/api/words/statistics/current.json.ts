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

	const distributionArray = db.query<Distribution>(
		'SELECT rowIndex, count(created_at) AS count FROM tbl_guesses WHERE guessId = wordId AND wordId = ? GROUP BY rowIndex',
		currentWord.id
	);

	const fullDistributionArray = Array.from({ length: 6 }, (_, i) => {
		return { rowIndex: i, count: 0 };
	});
	distributionArray.forEach((row) => {
		fullDistributionArray[row.rowIndex] = row;
	});

	return {
		status: 200,
		body: {
			distribution: fullDistributionArray
		}
	};
}

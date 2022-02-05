import db from '$lib/database';
import { getCurrentWordRow, validateWord } from '$lib/validate';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validatePayload = (payload: any): void => {
	if (typeof payload.word !== 'string') {
		throw new Error("The request body must contain a 'word' property of type string");
	}

	if (typeof payload.rowIndex !== 'number') {
		throw new Error("The request body must contain a 'rowIndex' property of type number");
	}
	const trimmedWord = (payload.word as string).trim();
	if (trimmedWord.length !== 5) {
		throw new Error('The word must be exactly 5 characters long');
	}
};

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request }) {
	const payload = await request.json();

	try {
		validatePayload(payload);
	} catch (error) {
		return {
			status: 400,
			body: {
				error: 'Malformed request',
				details: error.message
			}
		};
	}

	const currentWord = getCurrentWordRow();

	const trimmedWord = (payload.word as string).trim();
	const existsInDb = db.queryFirstRow('SELECT * FROM tbl_words WHERE word = ?', trimmedWord);

	// Not a valid guess
	if (!existsInDb) {
		const guessId = db.insert('tbl_words', { word: trimmedWord, approved: 0 });
		db.insert('tbl_guesses', {
			wordId: currentWord.id,
			guessId: guessId,
			rowIndex: payload.rowIndex
		});
		return {
			status: 404
		};
	}
	if (existsInDb.approved !== 1) {
		db.insert('tbl_guesses', {
			wordId: currentWord.id,
			guessId: existsInDb.id,
			rowIndex: payload.rowIndex
		});
		return {
			status: 404
		};
	}

	const validationStates = validateWord(trimmedWord, currentWord.word);
	db.insert('tbl_guesses', {
		wordId: currentWord.id,
		guessId: existsInDb.id,
		rowIndex: payload.rowIndex
	});
	return {
		status: 200,
		body: {
			tileStates: validationStates
		}
	};
}

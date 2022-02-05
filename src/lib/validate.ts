import db from './database';
import { TileState } from './types';

interface WordRow {
	id: number;
	word: string;
	approved: number;
	created_at: string;
	updated_at: string;
}

export const getCurrentWordRow = (): WordRow => {
	const firstDay = new Date('2022-01-24T22:59:59Z');
	const date = new Date();

	// get diff in days
	const diff = Math.floor((date.getTime() - firstDay.getTime()) / (1000 * 60 * 60 * 24));

	console.log(firstDay, ' ', date);

	const row = db.queryFirstRow<WordRow>(
		'SELECT * FROM tbl_words WHERE approved = 1 LIMIT 1 OFFSET ?',
		diff
	);

	console.log(row);
	return row;
};

export const validateWord = (guess: string, correctWord: string): TileState[] => {
	const states: TileState[] = [];

	if (guess.length !== correctWord.length) {
		throw new Error(
			`String length mismatch: guess: ${guess.length}, correctWord: ${correctWord.length}`
		);
	}

	const copiedCorrectWord = correctWord.split('');
	for (let i = 0; i < correctWord.length; i++) {
		const newState =
			guess[i] === copiedCorrectWord[i]
				? TileState.Correct
				: copiedCorrectWord.includes(guess[i])
				? TileState.WrongPlace
				: TileState.Incorrect;

		if (newState === TileState.WrongPlace) {
			copiedCorrectWord[copiedCorrectWord.indexOf(guess[i])] = '_';
		}

		states.push(newState);
	}

	return states;
};

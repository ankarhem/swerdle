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
	const states: TileState[] = Array.from({ length: correctWord.length }, () => TileState.Incorrect);

	if (guess.length !== correctWord.length) {
		throw new Error(
			`String length mismatch: guess: ${guess.length}, correctWord: ${correctWord.length}`
		);
	}

	const copiedCorrectWord = correctWord.split('');
	for (let i = 0; i < correctWord.length; i++) {
		if (guess[i] === copiedCorrectWord[i]) {
			copiedCorrectWord[i] = '_';
			states[i] = TileState.Correct;
		}
	}

	for (let i = 0; i < correctWord.length; i++) {
		const guessChar = guess[i];
		const indexInCorrectWord = copiedCorrectWord.indexOf(guessChar);
		if (indexInCorrectWord !== -1) {
			copiedCorrectWord[indexInCorrectWord] = '_';
			states[i] = TileState.WrongPlace;
		}
	}

	return states;
};

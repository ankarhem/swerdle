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
	if (guess.length !== correctWord.length) {
		throw new Error(
			`String length mismatch: guess: ${guess.length}, correctWord: ${correctWord.length}`
		);
	}

	/**
	 * Dictionary with
	 * - key: character
	 * - value: array of indices character appears in guess
	 */
	const guessIndicesMap: Record<string, number[]> = [...new Set(correctWord.split(''))].reduce(
		(acc, char) => {
			acc[char] = guess.split('').reduce((indices, char2, i) => {
				if (char === char2) {
					indices.push(i);
				}
				return indices;
			}, []);
			return acc;
		},
		{}
	);

	const states: TileState[] = Array.from({ length: correctWord.length }, () => TileState.Incorrect);

	Object.entries(guessIndicesMap).forEach(([char, indices]) => {
		let usages = correctWord.split('').filter((c) => c === char).length;
		indices.forEach((index) => {
			if (char === correctWord[index]) {
				states[index] = TileState.Correct;
				usages--;
			}
		});

		indices.forEach((index) => {
			// only interested in wrong place characters
			if (char === correctWord[index]) return;

			if (correctWord.includes(char) && usages > 0) {
				states[index] = TileState.WrongPlace;
				usages--;
			}
		});
	});

	return states;
};

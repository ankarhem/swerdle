import { TileState } from '$lib/types';
import { validateWord } from '$lib/validate';

it('Sets `Correct` on all letters if all are correct', () => {
	const guess = 'stick';
	const correctWord = 'stick';
	const states = validateWord(guess, correctWord);
	expect(states).toEqual([
		TileState.Correct,
		TileState.Correct,
		TileState.Correct,
		TileState.Correct,
		TileState.Correct
	]);
});

it('Sets `Incorrect` on all letters if none are correct', () => {
	const guess = 'abxyz';
	const correctWord = 'stick';
	const states = validateWord(guess, correctWord);
	expect(states).toEqual([
		TileState.Incorrect,
		TileState.Incorrect,
		TileState.Incorrect,
		TileState.Incorrect,
		TileState.Incorrect
	]);
});

it("Doesn't set a State more times than character exists in word", () => {
	const states = validateWord('annan', 'banan');
	expect(states).toEqual([
		TileState.WrongPlace,
		TileState.Incorrect,
		TileState.Correct,
		TileState.Correct,
		TileState.Correct
	]);
});

it('Only sets the correct tile if character exists as both WrongPlace and Correct', () => {
	const states = validateWord('japan', 'honan');
	expect(states).toEqual([
		TileState.Incorrect,
		TileState.Incorrect,
		TileState.Incorrect,
		TileState.Correct,
		TileState.Correct
	]);
});

it('Consecutive wrong place characters wont block each other', () => {
	const states = validateWord('stick', 'dåtid');
	expect(states).toEqual([
		TileState.Incorrect,
		TileState.WrongPlace,
		TileState.WrongPlace,
		TileState.Incorrect,
		TileState.Incorrect
	]);
});

it('should fail', () => {
	expect(true).toEqual(false);
});

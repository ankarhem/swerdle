import { TileState } from '$lib/types';
import { validateWord } from '$lib/validate';

it('Sets `Correct` on all letters if all are correct', () => {
	const states = validateWord('stick', 'stick');
	expect(states).toEqual([
		TileState.Correct,
		TileState.Correct,
		TileState.Correct,
		TileState.Correct,
		TileState.Correct
	]);
});

it('Sets `Incorrect` on all letters if none are correct', () => {
	const states = validateWord('abxyz', 'stick');
	expect(states).toEqual([
		TileState.Incorrect,
		TileState.Incorrect,
		TileState.Incorrect,
		TileState.Incorrect,
		TileState.Incorrect
	]);
});

it('Sets `WrongPlace` if character exists in word but is not at the correct spot', () => {
	const states = validateWord('yrsel', 'syran');
	expect(states).toEqual([
		TileState.WrongPlace,
		TileState.WrongPlace,
		TileState.WrongPlace,
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

	const otherStates = validateWord('kväds', 'vävds');
	expect(otherStates).toEqual([
		TileState.Incorrect,
		TileState.WrongPlace,
		TileState.WrongPlace,
		TileState.Correct,
		TileState.Correct
	]);
});

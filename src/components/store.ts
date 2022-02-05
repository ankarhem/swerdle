import { browser } from '$app/env';
import type { TileType } from '$lib/types';
import { GameState, TileState } from '$lib/types';
import { writable } from 'svelte/store';

const STORAGE_KEY = 'gameState';

const createEmptyGrid = (): TileType[][] => {
	return Array.from({ length: 6 }, () =>
		Array.from({ length: 5 }, () => ({ value: '', state: TileState.Unknown }))
	);
};

export const createInitialGameState = (wordId?: number): GameData => {
	const gameState: GameData = {
		grid: createEmptyGrid(),
		currentRow: 0,
		state: GameState.Playing,
		invalidWord: false,
		wordId: wordId
	};

	return gameState;
};

interface GameData {
	grid: TileType[][];
	currentRow: number;
	state: GameState;
	invalidWord: boolean;
	wordId?: number;
}

const initialState: GameData = createInitialGameState();

const storedState = browser ? localStorage.getItem(STORAGE_KEY) : null;
const parsedState = storedState ? JSON.parse(storedState) : initialState;

export const gameState = writable<GameData>(parsedState);

if (browser) {
	gameState.subscribe((value) => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
	});
}

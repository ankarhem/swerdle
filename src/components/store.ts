import { browser } from '$app/env';
import type { TileType } from '$lib/types';
import { TileState } from '$lib/types';
import { writable } from 'svelte/store';

const STORAGE_KEY = 'gameState';

export const createEmptyGrid = (): TileType[][] => {
	return Array.from({ length: 6 }, () =>
		Array.from({ length: 5 }, () => ({ value: '', state: TileState.Unknown }))
	);
};

export const emptyGrid: TileType[][] = createEmptyGrid();

interface GameState {
	grid: TileType[][];
	currentRow: number;
}

const initialState: GameState = {
	grid: emptyGrid,
	currentRow: 0
};

const storedState = browser ? localStorage.getItem(STORAGE_KEY) : null;
const parsedState = storedState ? JSON.parse(storedState) : initialState;

export const gameState = writable<GameState>(parsedState);

if (browser) {
	gameState.subscribe((value) => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
	});
}

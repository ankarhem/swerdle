import { browser } from '$app/env';
import { writable } from 'svelte/store';
import type { TileType } from './types';
import { TileState } from './types';

const STORAGE_KEY = 'gameState';

export const createEmptyGrid = (): TileType[][] => {
	return Array.from({ length: 6 }, () =>
		Array.from({ length: 5 }, () => ({ value: '', state: TileState.Unknown }))
	);
};

export const emptyGrid: TileType[][] = createEmptyGrid();

const initialState = {
	grid: emptyGrid,
	currentRow: 0
};

const storedState = browser ? localStorage.getItem(STORAGE_KEY) : null;
const parsedState = storedState ? JSON.parse(storedState) : initialState;

export const gameState = writable(parsedState);

if (browser) {
	gameState.subscribe((value) => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
	});
}

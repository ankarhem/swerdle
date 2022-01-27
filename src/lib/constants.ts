import type { TileType } from './types';

export const EXAMPLE_WON_GAME_STATE = [
	[
		{ value: 'g', state: 'INCORRECT' },
		{ value: 'i', state: 'INCORRECT' },
		{ value: 's', state: 'INCORRECT' },
		{ value: 's', state: 'INCORRECT' },
		{ value: 'a', state: 'INCORRECT' }
	],
	[
		{ value: 't', state: 'WRONG_PLACE' },
		{ value: 'o', state: 'INCORRECT' },
		{ value: 'r', state: 'CORRECT' },
		{ value: 'k', state: 'CORRECT' },
		{ value: 'a', state: 'INCORRECT' }
	],
	[
		{ value: 'k', state: 'WRONG_PLACE' },
		{ value: 'o', state: 'INCORRECT' },
		{ value: 'r', state: 'CORRECT' },
		{ value: 'k', state: 'CORRECT' },
		{ value: 'a', state: 'INCORRECT' }
	],
	[
		{ value: 'l', state: 'INCORRECT' },
		{ value: 'ä', state: 'CORRECT' },
		{ value: 'r', state: 'CORRECT' },
		{ value: 'k', state: 'CORRECT' },
		{ value: 'a', state: 'INCORRECT' }
	],
	[
		{ value: 'm', state: 'CORRECT' },
		{ value: 'ä', state: 'CORRECT' },
		{ value: 'r', state: 'CORRECT' },
		{ value: 'k', state: 'CORRECT' },
		{ value: 'e', state: 'INCORRECT' }
	],
	[
		{ value: 'm', state: 'CORRECT' },
		{ value: 'ä', state: 'CORRECT' },
		{ value: 'r', state: 'CORRECT' },
		{ value: 'k', state: 'CORRECT' },
		{ value: 't', state: 'CORRECT' }
	]
] as TileType[][];

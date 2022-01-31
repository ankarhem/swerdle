export type TileType = {
	value: string;
	state: TileState;
};

export enum TileState {
	Unknown = 'UNKNOWN',
	Correct = 'CORRECT',
	WrongPlace = 'WRONG_PLACE',
	Incorrect = 'INCORRECT'
}

export enum GameState {
	Playing = 'PLAYING',
	Won = 'WON',
	Lost = 'LOST'
}

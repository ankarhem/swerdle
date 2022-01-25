import { TileState } from './types';

export const getStateStyles = (state: TileState): string => {
	switch (state) {
		case TileState.Correct:
			return 'bg-green-300 text-green-600 border-green-600';
		case TileState.WrongPlace:
			return 'bg-yellow-300 text-yellow-600 border-yellow-600';
		case TileState.Incorrect:
			return 'bg-neutral-300 text-neutral-600 border-neutral-600';
		case TileState.Unknown:
			return 'bg-primary-50 text-primary-500 border-primary-300';
		default:
			return '';
	}
};

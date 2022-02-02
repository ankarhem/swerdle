import { TileState } from './types';

export const getStateStyles = (state: TileState): string => {
	switch (state) {
		case TileState.Correct:
			return 'bg-green-300 text-green-600 border-green-600 dark:bg-green-700/80 dark:text-green-400 dark:border-green-400';
		case TileState.WrongPlace:
			return 'bg-yellow-300 text-yellow-600 border-yellow-600 dark:bg-yellow-700/80 dark:text-yellow-500 dark:border-yellow-500';
		case TileState.Incorrect:
			return 'bg-neutral-300 text-neutral-600 border-neutral-600 dark:bg-neutral-700/80 dark:text-neutral-400/80 dark:border-neutral-400/80';
		case TileState.Unknown:
			return 'bg-primary-50 text-primary-500 border-primary-300 dark:bg-primary-800/[0.7] dark:text-primary-400 dark:border-primary-500/80';
		default:
			return '';
	}
};

<script context="module" lang="ts">
	export enum CharState {
		Unknown = 'UNKNOWN',
		Correct = 'CORRECT',
		WrongPlace = 'WRONG_PLACE',
		Incorrect = 'INCORRECT'
	}
</script>

<script lang="ts">
	export let character: string;

	export let state: CharState;

	const getStateStyles = (state) => {
		switch (state) {
			case CharState.Correct:
				return 'bg-green-400 text-primary-500 border-green-500 bg-opacity-50 border-opacity-50';
			case CharState.WrongPlace:
				return 'bg-yellow-400 text-primary-500 border-yellow-500 bg-opacity-50 border-opacity-50';
			case CharState.Incorrect:
				return 'bg-neutral-400 text-primary-500 border-neutral-500 bg-opacity-50 border-opacity-50';
			case CharState.Unknown:
				return 'bg-neutral-50 text-primary-500 border-primary-300';
			default:
				return '';
		}
	};

	$: stateStyles = getStateStyles(state);
</script>

<div
	class={`text-5xl w-16 h-16 rounded transition-colors border-2  uppercase font-bold flex items-center justify-center ${stateStyles}`}
>
	{character}
</div>

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
				return 'bg-green-400 text-primary-100';
			case CharState.WrongPlace:
				return 'bg-yellow-400 text-primary-100';
			case CharState.Incorrect:
				return 'bg-neutral-400 text-primary-100';
			case CharState.Unknown:
				return 'bg-neutral-50';
			default:
				return '';
		}
	};

	$: stateStyles = getStateStyles(state);
</script>

<div
	class={`text-5xl w-16 h-16 rounded transition-colors border-2 border-primary-300 uppercase font-bold flex items-center justify-center ${stateStyles}`}
>
	{character}
</div>

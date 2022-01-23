<script context="module" lang="ts">
	export enum CharState {
		Unknown = 'UNKNOWN',
		Correct = 'CORRECT',
		WrongPlace = 'WRONG_PLACE',
		Incorrect = 'INCORRECT'
	}
</script>

<script lang="ts">
	import { quadOut } from 'svelte/easing';
	export let character: string;
	export let state: CharState;

	const getStateStyles = (state) => {
		switch (state) {
			case CharState.Correct:
				return 'bg-green-300 text-green-600 border-green-600';
			case CharState.WrongPlace:
				return 'bg-yellow-300 text-yellow-600 border-yellow-600';
			case CharState.Incorrect:
				return 'bg-neutral-300 text-neutral-600 border-neutral-600';
			case CharState.Unknown:
				return 'bg-neutral-50 text-neutral-500 border-neutral-300';
			default:
				return '';
		}
	};

	$: stateStyles = getStateStyles(state);

	function expand(node, params) {
		const existingTransform = getComputedStyle(node).transform.replace('none', '');

		if (character.length === 0) return;

		return {
			delay: 0,
			duration: 100,
			easing: quadOut,
			css: (t, u) => `transform: ${existingTransform} scale(${1 + 0.3 * (t > 0.5 ? 1 - t : 1 - u)})`
		};
	}
</script>

{#key character.toLowerCase()}
	<div
		in:expand
		class={`text-5xl w-16 h-16 rounded transition-colors border-2 uppercase font-bold flex items-center justify-center ${stateStyles}`}
	>
		{character}
	</div>
{/key}

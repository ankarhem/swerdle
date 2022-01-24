<script context="module" lang="ts">
	export enum TileState {
		Unknown = 'UNKNOWN',
		Correct = 'CORRECT',
		WrongPlace = 'WRONG_PLACE',
		Incorrect = 'INCORRECT'
	}
</script>

<script lang="ts">
	import { quadOut } from 'svelte/easing';
	export let character: string;
	export let state: TileState;
	export let index: number;

	const getStateStyles = (state) => {
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

	function rotate(node, params) {
		const existingTransform = getComputedStyle(node).transform.replace('none', '');

		if (state === TileState.Unknown) return;

		return {
			delay: 500 * params.index + (params.isIn ? 200 : 0),
			duration: params.duration,
			easing: quadOut,
			css: (t, u) =>
				`transform: ${existingTransform} rotateX(${u * 90}deg); opacity: ${u === 1 ? 0 : 1};`
		};
	}
</script>

{#key state}
	<div
		class="col-start-1 row-start-1"
		in:rotate={{ index: index, duration: 200, isIn: true }}
		out:rotate={{ index: index, duration: 200 }}
	>
		{#key character.toLowerCase()}
			<div
				in:expand|local
				class={`text-5xl w-16 h-16 rounded border-2 transition-colors uppercase font-bold flex items-center justify-center ${stateStyles}`}
			>
				{character}
			</div>
		{/key}
	</div>
{/key}

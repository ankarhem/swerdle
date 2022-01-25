<script lang="ts">
	import { getStateStyles } from '$lib/getStateStyles';
	import { TileState } from '$lib/types';
	import { fade } from 'svelte/transition';
	import { gameState } from '../store';
	import { ROTATE_DURATION } from '../transitions';
	export let key: string;
	export let specialKey: boolean = false;

	const handleClick: svelte.JSX.MouseEventHandler<HTMLButtonElement> = (event) => {
		console.log(key);
		if (!key || typeof window === 'undefined') return;

		window.dispatchEvent(
			new KeyboardEvent('keydown', {
				key: key
			})
		);
	};

	$: states = new Set(
		$gameState.grid
			.flat()
			.filter((tile) => tile.value === key)
			.map((tile) => tile.state)
	);
	$: state = states.has(TileState.Correct)
		? TileState.Correct
		: states.has(TileState.WrongPlace)
		? TileState.WrongPlace
		: states.has(TileState.Incorrect)
		? TileState.Incorrect
		: TileState.Unknown;
	$: stateStyle = getStateStyles(state);

	// wait for all keys to flip before fading in the new keys
	const animationDelay = ROTATE_DURATION * 5;
</script>

<div class={`grid ${specialKey === false ? '' : 'col-span-2'}`}>
	{#key state}
		<button
			transition:fade|local={{ delay: state === TileState.Unknown ? 0 : animationDelay }}
			class={`${stateStyle} ${
				// to override the lesser border in stateStyles used on the tiles
				state === TileState.Unknown ? 'border-primary-500' : ''
			} col-start-1 row-start-1 transition-colors border text-lg flex items-center justify-center py-4 rounded uppercase font-bold`}
			on:click={handleClick}
		>
			<slot>
				{key}
			</slot>
		</button>
	{/key}
</div>

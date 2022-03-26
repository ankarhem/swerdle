<script lang="ts">
	import { getStateStyles } from '$lib/getStateStyles';
	import { TileState } from '$lib/types';
	import { createEventDispatcher } from 'svelte';
	import { gameState } from '../store';
	import { ROTATE_DURATION } from '../transitions';

	export let key: string;
	export let specialKey: boolean = false;
	export let disabled: boolean = false;

	const dispatch = createEventDispatcher();

	const handleClick: svelte.JSX.MouseEventHandler<HTMLButtonElement> = (event) => {
		event.preventDefault();

		dispatch('click', key);
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
	$: animationDelay = state === TileState.Unknown ? 0 : ROTATE_DURATION * 5;
</script>

<div class={`grid ${specialKey === false ? '' : 'col-span-2'}`}>
	<button
		{disabled}
		style="transition-delay: {animationDelay}ms"
		class={`${stateStyle} ${
			// to override the lesser border in stateStyles used on the tiles
			state === TileState.Unknown ? 'border-primary-500' : ''
		} col-start-1 row-start-1 border text-lg flex transition-colors items-center justify-center h-14 sm:h-16 rounded uppercase font-bold select-none disabled:cursor-not-allowed`}
		on:click={handleClick}
	>
		<slot>
			{key}
		</slot>
	</button>
</div>

<script lang="ts">
	import { GameState } from '$lib/types';
	import Modal from './Modal/Modal.svelte';
	import ShareModalContent from './Modal/ShareModalContent.svelte';
	import { gameState } from './store';
	import Tile from './Tile.svelte';
	import { ROTATE_DURATION, shake } from './transitions';

	export let wordId: number;

	$: currentRow = $gameState.currentRow;

	$: modalOpen = $gameState.state !== GameState.Playing;

	const transitionDelay = ROTATE_DURATION * 5 + 200;
</script>

<Modal
	open={modalOpen}
	title={$gameState.state === GameState.Won ? 'Du vann! 🥳' : 'Du förlorade! 🙈'}
	{transitionDelay}
>
	<ShareModalContent {wordId} />
</Modal>
<div
	class="text-[11vw] sm:text-5xl flex flex-1 items-center py-2 standalone:text-5xl lg:flex-grow-0 lg:py-6"
>
	<div class="grid gap-[0.08em] grid-cols-1">
		{#each $gameState.grid as row, i (`row-${i}`)}
			{#if $gameState.invalidWord && i === currentRow}
				<div
					class="grid grid-cols-5 gap-[0.08em]"
					in:shake
					on:introend={() => {
						$gameState.invalidWord = false;
					}}
				>
					{#each row as tile, j (`tile-${i}-${j}`)}
						<Tile character={tile.value} state={tile.state} index={j} />
					{/each}
				</div>
			{:else}
				<div class="grid grid-cols-5 gap-[0.08em]">
					{#each row as tile, j (`tile-${i}-${j}`)}
						<Tile character={tile.value} state={tile.state} index={j} />
					{/each}
				</div>
			{/if}
		{/each}
	</div>
</div>

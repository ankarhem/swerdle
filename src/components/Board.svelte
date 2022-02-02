<script lang="ts">
	import { GameState, TileState } from '$lib/types';
	import { Icon, Share } from 'svelte-hero-icons';
	import { getNotificationsContext } from 'svelte-notifications';
	import CountdownTimer from './CountdownTimer.svelte';
	import Modal from './Modal.svelte';
	import { createInitialGameState, gameState } from './store';
	import Tile from './Tile.svelte';
	import { ROTATE_DURATION, shake } from './transitions';

	const { addNotification } = getNotificationsContext();

	export let id: number;

	$: currentRow = $gameState.currentRow;

	const handleShare = () => {
		const title = `Swerdle #${id} - ${$gameState.currentRow + 1}/6`;
		const body = $gameState.grid
			.map((row) => {
				return row
					.map((tile) => {
						switch (tile.state) {
							case TileState.Correct:
								return '🟩';
							case TileState.Incorrect:
								return '⬜️';
							case TileState.WrongPlace:
								return '🟨';
						}
					})
					.join('');
			})
			.filter((row) => row.length > 0)
			.join('\n');

		const message = title + '\n\n' + body;
		navigator.clipboard.writeText(message);

		// TODO: Fix z-index issue with modal overlay
		addNotification({
			type: 'success',
			text: 'Kopierat till urklipp!',
			position: 'top-center',
			removeAfter: 1000
		});
	};

	$: modalOpen = $gameState.state !== GameState.Playing;

	$: {
		const isYesterday = $gameState.initiatedAt < Date.now() - 86400000;
		if (isYesterday) {
			const newState = createInitialGameState();
			$gameState = newState;
		}
	}

	const transitionDelay = ROTATE_DURATION * 5 + 200;
</script>

<Modal
	open={modalOpen}
	title={$gameState.state === GameState.Won ? 'Du vann! 🥳' : 'Du förlorade! 🙈'}
	{transitionDelay}
>
	<div class="flex flex-col items-center gap-4">
		<div>Nästa ord kommer om:</div>
		<CountdownTimer />
		<button
			on:click={handleShare}
			class="uppercase font-bold bg-green-200 flex gap-4 py-2 px-4 rounded text-green-600 hover:bg-green-300/80"
		>
			<Icon src={Share} size="24px" />
			<span>Dela</span>
		</button>
	</div>
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

<script lang="ts">
	import { GameState, TileState } from '$lib/types';
	import { Icon, Share } from 'svelte-hero-icons';
	import { getNotificationsContext } from 'svelte-notifications';
	import CountdownTimer from './CountdownTimer.svelte';
	import Modal from './Modal.svelte';
	import { createInitialGameState, gameState } from './store';
	import Tile from './Tile.svelte';
	import { shake } from './transitions';

	const { addNotification } = getNotificationsContext();

	const allowedCharacters = 'abcdefghijklmnopqrstuvwxyzåäöABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ';

	export let dailyWord: string;

	// hackyhack
	let tries = 1;
	const triggerShake = () => {
		tries++;
	};

	$: currentRow = $gameState.currentRow;
	$: currentGuess = $gameState.grid[currentRow].map((tile) => tile.value).join('');

	const handleDeleteKey = () => {
		if (currentGuess.length === 0) return;

		$gameState.grid[currentRow][currentGuess.length - 1].value = '';
	};

	const handleAddKey = (key: string) => {
		if (!allowedCharacters.includes(key)) return;
		if (currentGuess.length === 5) return;

		$gameState.grid[currentRow][currentGuess.length].value = key.toLowerCase();
	};

	const handleSubmit = async () => {
		if (currentGuess.length !== 5) return;

		const response = await fetch(`/api/words/${currentGuess}.json`);
		if (!response.ok) {
			const data = await response.json();
			if (response.status === 404) {
				addNotification({
					type: 'warning',
					text: 'Finns ej i ordlistan',
					position: 'top-center',
					removeAfter: 1000
				});
			} else {
				addNotification({
					type: 'error',
					text: data.message,
					position: 'top-center',
					removeAfter: 1000
				});
			}
			triggerShake();
			return;
		}

		currentGuess.split('').forEach((char, index) => {
			const newState =
				char === dailyWord[index]
					? TileState.Correct
					: dailyWord.includes(char)
					? TileState.WrongPlace
					: TileState.Incorrect;
			$gameState.grid[currentRow][index].state = newState;
		});

		if (currentRow === 5 || currentGuess === dailyWord) {
			$gameState.state = currentGuess === dailyWord ? GameState.Won : GameState.Lost;
			return;
		}

		if (currentRow === 5) return;
		$gameState.currentRow++;
	};

	const handleKeyDown = (event) => {
		if ($gameState.state !== GameState.Playing) return;

		switch (event.key) {
			case 'Backspace':
				handleDeleteKey();
				break;
			case 'Enter':
				handleSubmit();
				break;
			default:
				handleAddKey(event.key);
		}
	};

	const handleShare = () => {
		const title = `Swerdle ${$gameState.currentRow + 1}/6`;
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
</script>

<svelte:window on:keydown={handleKeyDown} />

<Modal open={modalOpen} title={GameState.Won ? 'Du vann! 🥳' : 'Du förlorade! 🙈'}>
	<div class="flex flex-col items-center gap-4">
		<div>Nästa ord kommer om:</div>
		<CountdownTimer />
		<button
			on:click={handleShare}
			class="uppercase font-bold bg-green-200 flex gap-4 py-2 px-4 rounded text-green-600 hover:bg-green-300/80"
		>
			<Icon src={Share} size="1.5rem" />
			<span>Dela</span>
		</button>
	</div>
</Modal>
<div class="flex-1 my-2 items-center flex text-5xl">
	<div class="flex flex-col gap-[0.08em]">
		{#each $gameState.grid as row, i (`row-${i}`)}
			{#each [tries] as t (t)}
				<div class="flex gap-[0.08em]" in:shake|local={{ duration: currentRow === i ? 600 : 0 }}>
					{#each row as tile, j (`tile-${i}-${j}`)}
						<Tile character={tile.value} state={tile.state} index={j} />
					{/each}
				</div>
			{/each}
		{/each}
	</div>
</div>

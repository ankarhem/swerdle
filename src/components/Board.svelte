<script lang="ts">
	import { TileState } from '$lib/types';
	import { gameState } from './store';
	import Tile from './Tile.svelte';
	import { shake } from './transitions';

	const allowedCharacters = 'abcdefghijklmnopqrstuvwxyzåäöABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ';

	export let dailyWord: string;

	let isDone = false;

	// hackyhack
	let tries = 1;
	const triggerShake = () => {
		tries++;
		console.log(tries);
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

		$gameState.grid[currentRow][currentGuess.length].value = key;
	};

	const handleSubmit = async () => {
		if (currentGuess.length !== 5) return;

		const response = await fetch(`/api/words/${currentGuess}.json`);
		if (!response.ok) {
			triggerShake();
			console.log(await response.json());
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
			isDone = true;
		}

		if (currentRow === 5) return;
		$gameState.currentRow++;
	};

	const handleKeyDown = (event) => {
		if (isDone) return;

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
</script>

<svelte:window on:keydown={handleKeyDown} />

<div class="flex-1 my-2 items-center flex">
	<div class="flex flex-col gap-1">
		{#each $gameState.grid as row, i (`row-${i}`)}
			{#each [tries] as t (t)}
				<div class="flex gap-1" in:shake|local={{ duration: currentRow === i ? 600 : 0 }}>
					{#each row as tile, j (`tile-${i}-${j}`)}
						<Tile character={tile.value} state={tile.state} index={j} />
					{/each}
				</div>
			{/each}
		{/each}
	</div>
</div>

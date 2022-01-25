<script lang="ts">
	import Tile from './Tile.svelte';
	import { TileState, TileType } from './types';

	const allowedCharacters = 'abcdefghijklmnopqrstuvwxyzåäöABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ';
	const grid: TileType[][] = Array.from({ length: 6 }, () =>
		Array.from({ length: 5 }, () => ({ value: '', state: TileState.Unknown }))
	);

	export let dailyWord: string;
	let currentRow = 0;
	let isDone = false;

	$: currentGuess = grid[currentRow].map((tile) => tile.value).join('');

	const handleDeleteKey = () => {
		if (currentGuess.length === 0) return;

		grid[currentRow][currentGuess.length - 1].value = '';
	};

	const handleAddKey = (key: string) => {
		if (!allowedCharacters.includes(key)) return;
		if (currentGuess.length === 5) return;

		grid[currentRow][currentGuess.length].value = key;
	};

	const handleSubmit = () => {
		if (currentGuess.length !== 5) return;

		currentGuess.split('').forEach((char, index) => {
			const newState =
				char === dailyWord[index]
					? TileState.Correct
					: dailyWord.includes(char)
					? TileState.WrongPlace
					: TileState.Incorrect;
			grid[currentRow][index].state = newState;
		});

		if (currentRow === 5 || currentGuess === dailyWord) {
			isDone = true;
		}

		if (currentRow === 5) return;
		currentRow++;
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
	<div class="grid grid-cols-5 grid-rows-6 gap-1">
		{#each grid as row}
			{#each row as tile, i}
				<div class="grid">
					<Tile character={tile.value} state={tile.state} index={i} />
				</div>
			{/each}
		{/each}
	</div>
</div>

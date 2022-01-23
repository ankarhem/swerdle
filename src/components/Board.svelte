<script context="module" lang="ts">
	type TileType = {
		value: string;
		state: CharState;
	};
</script>

<script lang="ts">
	import Tile, { CharState } from './Tile.svelte';

	const allowedCharacters = 'abcdefghijklmnopqrstuvwxyzåäöABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ';
	const grid: TileType[][] = Array.from({ length: 6 }, (v, i) =>
		Array.from({ length: 5 }, (v, i) => ({ value: '', state: CharState.Unknown }))
	);

	const currentWord = 'earth';
	let currentRow = 0;

	$: currentGuess = grid[currentRow].map((tile) => tile.value).join('');

	const getState = (char: string, index: number): CharState => {
		if (char === currentWord[index]) {
			return CharState.Correct;
		}
		if (currentWord.includes(char)) {
			return CharState.WrongPlace;
		}

		return CharState.Incorrect;
	};

	const handleDeleteKey = () => {
		if (currentGuess.length === 0) return;

		const newTile: TileType = {
			value: '',
			state: CharState.Incorrect
		};

		grid[currentRow][currentGuess.length - 1] = newTile;
	};

	const handleAddKey = (key: string) => {
		if (!allowedCharacters.includes(key)) return;
		if (currentGuess.length === 5) return;

		const newTile: TileType = {
			value: key,
			state: getState(key, currentGuess.length)
		};

		console.log(getState(key, currentGuess.length));

		grid[currentRow][currentGuess.length] = newTile;
	};

	const handleSubmit = (guess: string) => {
		if (guess.length !== 5) return;
		if (currentWord !== guess && currentRow < 5) {
			currentRow++;
			return;
		}

		if (guess === currentWord) {
			alert('You win!');
		} else {
			alert('You lose!');
		}
	};

	const handleKeyDown = (event) => {
		const key = event.key;

		switch (key) {
			case 'Backspace':
				handleDeleteKey();
				break;
			case 'Enter':
				handleSubmit(currentGuess);
				break;
			default:
				handleAddKey(key);
		}
	};
</script>

<svelte:window on:keydown={handleKeyDown} />

<div class="flex-1 my-2 items-center flex">
	<div class="grid grid-cols-5 grid-rows-6 gap-1">
		{#each grid as row}
			{#each row as tile}
				<Tile character={tile.value} state={tile.state} />
			{/each}
		{/each}
	</div>
</div>

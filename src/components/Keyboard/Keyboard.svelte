<script lang="ts">
	import { GameState, TileState } from '$lib/types';
	import { Backspace, Icon } from 'svelte-hero-icons';
	import { getNotificationsContext } from 'svelte-notifications';
	import { gameState } from '../store';
	import Key from './Key.svelte';

	export let dailyWord: string;

	const { addNotification } = getNotificationsContext();

	const allowedCharacters = 'abcdefghijklmnopqrstuvwxyzåäöABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ';

	let firstRow = 'qwertyuiopå';
	let middleRow = 'asdfghjklöä';
	let bottomRow = 'zxcvbnm';

	$: currentRow = $gameState.currentRow;
	$: currentGuess = $gameState.grid[currentRow].map((tile) => tile.value).join('');

	const handleKeyDown: svelte.JSX.KeyboardEventHandler<Window> = (event) => {
		handleKey(event.key);
	};
	const handleClick = (event: CustomEvent<string>) => {
		handleKey(event.detail);
	};

	const handleKey = (key: string) => {
		if ($gameState.state !== GameState.Playing) return;

		switch (key) {
			case 'Backspace':
				handleDeleteKey();
				break;
			case 'Enter':
				handleSubmit();
				break;
			default:
				handleAddKey(key);
		}
	};

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
				$gameState.invalidWord = true;
			} else {
				addNotification({
					type: 'error',
					text: data.message,
					position: 'top-center',
					removeAfter: 1000
				});
			}
			return;
		}

		let dailyWordAsArray = dailyWord.split('');
		currentGuess.split('').forEach((char, index) => {
			const newState =
				char === dailyWordAsArray[index]
					? TileState.Correct
					: dailyWordAsArray.includes(char)
					? TileState.WrongPlace
					: TileState.Incorrect;

			// To prevent confusion with mutiple tiles with the same value
			if (newState === TileState.Correct) {
				dailyWordAsArray[index] = '';
			}
			$gameState.grid[currentRow][index].state = newState;
		});

		if (currentRow === 5 || currentGuess === dailyWord) {
			$gameState.state = currentGuess === dailyWord ? GameState.Won : GameState.Lost;
			return;
		}

		if (currentRow === 5) return;
		$gameState.currentRow++;
	};
</script>

<svelte:window on:keydown={handleKeyDown} />
<div class="max-w-lg w-full pb-safe mb-2 px-1">
	<div class="grid grid-cols-11 gap-1">
		{#each firstRow as char}
			<Key key={char} on:click={handleClick} />
		{/each}
		{#each middleRow as char}
			<Key key={char} on:click={handleClick} />
		{/each}
		<Key specialKey key="Enter" on:click={handleClick}>⏎</Key>
		{#each bottomRow as char}
			<Key key={char} on:click={handleClick} />
		{/each}
		<Key specialKey key="Backspace" on:click={handleClick}>
			<Icon src={Backspace} size="24px" />
		</Key>
	</div>
</div>

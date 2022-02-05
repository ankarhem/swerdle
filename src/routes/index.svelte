<script context="module" lang="ts">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ fetch }) {
		const url = `/api/words/current.json`;
		const res: Response = await fetch(url);
		const data = await res.json();

		return {
			props: {
				wordId: data.id
			}
		};
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import Board from '../components/Board.svelte';
	import Keyboard from '../components/Keyboard/Keyboard.svelte';
	import { createInitialGameState, gameState } from '../components/store';

	export let wordId;

	onMount(() => {
		if ($gameState.wordId !== wordId) {
			const newState = createInitialGameState(wordId);
			$gameState = newState;
		}
	});
</script>

<Board {wordId} />
<Keyboard />

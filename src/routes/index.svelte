<script context="module" lang="ts">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ fetch }) {
		const url = `/api/words/current.json`;
		const res: Response = await fetch(url);
		const data = await res.json();

		if (res.ok) {
			return {
				props: {
					id: data.id,
					dailyWord: data.word
				}
			};
		}

		return {
			status: res.status,
			error: data.message
		};
	}
</script>

<script lang="ts">
	import Board from '../components/Board.svelte';
	import Keyboard from '../components/Keyboard/Keyboard.svelte';

	export let dailyWord;
	export let id;
</script>

<Board {id} />
<Keyboard {dailyWord} />

<script context="module" lang="ts">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ fetch }) {
		const url = `/api/words/current.json`;
		const res: Response = await fetch(url);
		const data = await res.json();

		return {
			props: {
				id: data.id
			}
		};
	}
</script>

<script lang="ts">
	import Board from '../components/Board.svelte';
	import Keyboard from '../components/Keyboard/Keyboard.svelte';

	export let id;
</script>

<Board {id} />
<Keyboard />

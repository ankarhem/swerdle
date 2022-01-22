<script lang="ts">
	import Tile from './Tile.svelte';

	let numRows = Array.from({ length: 6 }, (v, i) => i);
	let rowLength = Array.from({ length: 5 }, (v, i) => i);
</script>

<div class="flex flex-col items-center">
	{#each numRows as row, rowIndex}
		<div class="flex">
			{#each rowLength as col, i}
				<Tile character={'a'} />
			{/each}
		</div>
	{/each}
</div>

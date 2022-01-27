<script lang="ts">
	import { EXAMPLE_WON_GAME_STATE } from '$lib/constants';
	import { fade, fly } from 'svelte/transition';
	import Tile from '../components/Tile.svelte';
</script>

<article
	class="max-w-md bg-primary-100 border-primary-700 text-neutral-900 p-5 m-5 rounded border-2"
>
	<h1 class="text-xl font-bold uppercase leading text-center mb-4">Hur fungerar det?</h1>

	<ul class="list-disc list-inside text-primary-600">
		<li class="m-1">
			Du har <span class="font-bold text-md">6 försök</span> på dig att gissa ordet
			<div class="flex-1 mx-6 my-4 items-center flex">
				<div class="flex flex-col gap-[0.08em]">
					{#each EXAMPLE_WON_GAME_STATE as row, i}
						<div class="flex gap-[0.08em]" in:fade={{ delay: 400 * i }}>
							{#each row as tile, index}
								<Tile state={tile.state} {index} />
							{/each}
						</div>
					{/each}
				</div>
				<div class="flex items-center justify-center p-4" in:fly={{ y: -35, delay: 400 * 6 + 200 }}>
					✅
				</div>
			</div>
		</li>
		<li class="m-1">
			Alla gissningar måste vara <span class="font-bold text-md">giltliga ord</span>
		</li>
		<li class="m-1">Brickornas färger ger dig ledtrådar om vilket ord som söks</li>
	</ul>
</article>

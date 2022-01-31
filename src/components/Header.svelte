<script lang="ts">
	import { GameState } from '$lib/types';
	import { ChartBar, Icon, QuestionMarkCircle } from 'svelte-hero-icons';
	import { createEmptyGrid, gameState } from './store';

	const handleClick = () => {
		const newState = {
			grid: createEmptyGrid(),
			currentRow: 0,
			state: GameState.Playing
		};
		$gameState = newState;
	};

	const inDev = process.env.NODE_ENV === 'development';
</script>

<div
	class="self-stretch px-3 py-0.5 bg-gray-200 border-b-[3px] border-b-primary-500 flex justify-between items-center"
>
	<a href="/hjalp" class="text-primary-500">
		<Icon src={QuestionMarkCircle} size="1.5rem" />
	</a>
	<div class="flex items-center flex-col uppercase text-primary-500 py-1">
		<h1 class="text-5xl mx-auto">
			<a href="/" class="flex font-bold leading-10">
				<span class="text-blue-400">S</span>
				<span class="text-yellow-400">W</span>
				<span class="text-blue-400">E</span>
				<span>rdle</span>
			</a>
		</h1>
		<div class="text-xs block">Wordle på svenska</div>
		{#if inDev}
			<button on:click={handleClick}> Reset </button>
		{/if}
	</div>
	<a href="/statistik" class="text-primary-500 opacity-0 pointer-events-none">
		<Icon src={ChartBar} size="1.5rem" />
	</a>
</div>

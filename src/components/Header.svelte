<script lang="ts">
	import { ChartBar, Icon, QuestionMarkCircle } from 'svelte-hero-icons';
	import { createInitialGameState, gameState } from './store';

	const handleClick = () => {
		const newState = createInitialGameState();
		$gameState = newState;
	};

	const inDev = process.env.NODE_ENV === 'development';
</script>

<header
	class="self-stretch px-3 py-0.5 bg-gray-200 border-b-primary-500 dark:bg-neutral-700 dark:border-primary-500 border-b-[3px] flex justify-between items-center pt-safe"
>
	<a href="/hjalp" class="text-primary-500 dark:text-primary-400">
		<Icon src={QuestionMarkCircle} size="24px" />
	</a>
	<div
		class="flex items-center flex-col uppercase text-primary-500 dark:text-primary-400 py-1 relative"
	>
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
			<button
				on:click={handleClick}
				class="hidden sm:block absolute top-0 bottom-0 right-0 translate-x-[200%]"
			>
				Reset
			</button>
		{/if}
	</div>
	<a href="/statistik" class="text-primary-500 opacity-0 pointer-events-none">
		<Icon src={ChartBar} size="24px" />
	</a>
</header>

<script lang="ts">
	import { GameState, TileState } from '$lib/types';
	import { ExternalLink, Icon, Share } from 'svelte-hero-icons';
	import { getNotificationsContext } from 'svelte-notifications';
	import { scale } from 'svelte/transition';
	import CountdownTimer from '../CountdownTimer.svelte';
	import LoadingSpinner from '../LoadingSpinner.svelte';
	import { gameState } from '../store';

	export let wordId: number;

	const { addNotification } = getNotificationsContext();

	const handleShare = () => {
		const title = `Swerdle #${wordId} - ${$gameState.currentRow + 1}/6`;
		const body = $gameState.grid
			.map((row) => {
				return row
					.map((tile) => {
						switch (tile.state) {
							case TileState.Correct:
								return '🟩';
							case TileState.Incorrect:
								return '⬜️';
							case TileState.WrongPlace:
								return '🟨';
						}
					})
					.join('');
			})
			.filter((row) => row.length > 0)
			.join('\n');

		const message = title + '\n\n' + body;
		navigator.clipboard.writeText(message);

		addNotification({
			type: 'success',
			text: 'Kopierat till urklipp!',
			position: 'top-center',
			removeAfter: 1000
		});
	};

	const fetchStatistics = async () => {
		const response = await fetch(`/api/words/statistics/current.json`);

		const data = await response.json();

		return data;
	};

	const stats = fetchStatistics();
</script>

<div class="flex flex-col items-center text-primary-500/90 dark:text-primary-500/95">
	<h3 class="font-bold text-2xl text-center mb-4 text-primary-500 dark:text-primary-400">
		Utmana dina vänner
	</h3>
	<div class="max-w-[20ch] mb-6 text-center">
		{#if $gameState.state === GameState.Won}
			Skryt om ditt resultat genom att klicka på dela knappen 👇!
		{:else}
			Dela din besvikelse över hur orimligt svårt ordet var med knappen 👇!
		{/if}
	</div>
	<button
		on:click={handleShare}
		class="uppercase font-bold bg-green-200 flex gap-4 py-2 px-4 rounded text-green-600 hover:bg-green-300/80 dark:bg-green-600/80 dark:text-green-300 dark:hover:bg-green-600/70"
	>
		<Icon src={Share} size="24px" />
		<span>Dela</span>
	</button>
	<span class="text-xs p-1">(Avslöjar ej dina gissningar)</span>
	<h3
		class="font-bold text-2xl mt-11 mb-6 max-w-[20ch] text-center text-primary-500 dark:text-primary-400"
	>
		Hur har det gått för andra?
	</h3>
	{#await stats then data}
		<div class="max-w-[30ch] text-center">
			Dagens ord
			<a
				class="border border-primary-500 dark:border-primary-400 uppercase rounded p-1 mx-1 bg-transparent hover:bg-primary-300 dark:hover:bg-primary-700 text-primary-500 dark:text-primary-400 flex-inline items-center w-min"
				href={`https://svenska.se/saol/?q=${data.word}`}
				target="_blank"
				rel="noopener noreferrer"
			>
				{data.word}<Icon src={ExternalLink} size="12" class="inline align-baseline ml-1" /></a
			>
			har spelats av <span class="font-bold text-primary-500">{data.total.played}</span> personer
			varav
			<span class="font-bold text-primary-500">{data.total.won}</span> var har klarat ordet.
		</div>
	{/await}
	<figure class="flex flex-col items-center gap-4 mt-6">
		<figcaption class="font-bold text-xl max-w-[20ch] text-center" />
		<div class="flex h-32 rounded gap-4 justify-center items-center">
			{#await stats}
				<LoadingSpinner />
			{:then data}
				{#if data.total === 0}
					<p>Ingen har löst dagens problem ännu! 😱</p>
				{:else}
					{#each data.distribution as distItem}
						<div
							class="self-stretch flex flex-col gap-1 w-6 sm:w-8 items-center rounded justify-end"
						>
							<span
								in:scale={{ duration: 500 }}
								class="flex-1 bg-green-200 w-full rounded max-h-[var(--bar-height)]"
								style="--bar-height: {Math.max(
									(distItem.count / Math.max(...data.distribution.map((item) => item.count))) * 100,
									5
								)}%"
							/>
							<span class="flex-0">{distItem.rowIndex + 1}</span>
						</div>
					{/each}
				{/if}
			{/await}
		</div>
		<span>Antal gissningar (vunna spel)</span>
	</figure>
	<h3
		class="font-bold text-2xl mt-11 mb-6 max-w-[20ch] text-center text-primary-500 dark:text-primary-400"
	>
		Nästa ord kommer snart!
	</h3>
	<CountdownTimer />
</div>

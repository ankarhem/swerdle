<script lang="ts">
	import { TileState } from '$lib/types';
	import { Icon, Share } from 'svelte-hero-icons';
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

		// TODO: Fix z-index issue with modal overlay
		addNotification({
			type: 'success',
			text: 'Kopierat till urklipp!',
			position: 'top-center',
			removeAfter: 1000
		});
	};

	const fetchDistribution = async () => {
		// wait 2000ms
		// await new Promise((resolve) => setTimeout(resolve, 200));
		const response = await fetch(`/api/words/statistics/current.json`);

		const data = await response.json();
		const total = data.distribution.reduce((acc, item) => acc + item.count, 0);
		// const counts: [] = data.distribution.map((item) => item.count);

		// const percentile =
		// 	1 -
		// 	counts.reduce((acc, curr, index) => {
		// 		if (index >= $gameState.currentRow) {
		// 			return acc + curr;
		// 		}
		// 		return acc;
		// 	}, 0) /
		// 		total;
		// return {
		// 	distribution: data.distribution,
		// 	percentile: percentile
		// };
		return {
			...data,
			total: total
		};
	};
</script>

<div class="flex flex-col items-center gap-4">
	<figure class="flex flex-col items-center gap-4">
		<figcaption class="font-bold text-xl max-w-[20ch] text-center">
			Lösningsdistribution för Swerdle #{wordId}
		</figcaption>
		<div class="flex h-32 rounded gap-4 p-4 justify-center items-center">
			{#await fetchDistribution()}
				<LoadingSpinner />
			{:then data}
				{#if data.total === 0}
					<p>Ingen har löst dagens problem ännu! 😱</p>
				{:else}
					{#each data.distribution as distItem}
						<div
							class="self-stretch flex flex-col gap-1 w-8 sm:w-10 items-center rounded justify-end"
						>
							<span
								in:scale={{ duration: 500 }}
								class="flex-1 bg-green-200 w-full rounded max-h-[var(--bar-height)]"
								style="--bar-height: {data.total
									? Math.max((distItem.count / data.total) * 100, 5)
									: 100}%"
							/>
							<span class="flex-0">{distItem.rowIndex + 1}</span>
						</div>
					{/each}
				{/if}
			{/await}
		</div>
	</figure>
	<h3 class="font-bold text-xl">Nästa ord kommer om:</h3>
	<CountdownTimer />
	<button
		on:click={handleShare}
		class="uppercase font-bold bg-green-200 flex gap-4 py-2 px-4 rounded text-green-600 hover:bg-green-300/80 dark:bg-green-600/80 dark:text-green-300 dark:hover:bg-green-600/70"
	>
		<Icon src={Share} size="24px" />
		<span>Dela</span>
	</button>
</div>

<script lang="ts">
	import { EXAMPLE_WON_GAME_STATE } from '$lib/constants';
	import { TileState } from '$lib/types';
	import Tile from '../components/Tile.svelte';
</script>

<article
	class="max-w-md bg-primary-100 border-primary-500 text-primary-500 p-5 m-5 rounded border-[3px] dark:bg-neutral-700 dark:border-primary-500 dark:text-primary-400"
>
	<h1 class="text-xl font-bold uppercase leading text-center mb-4">Hur fungerar det?</h1>

	<ul class="list-disc list-inside">
		<!-- Valid guesses -->
		<li class="m-1">
			Alla gissningar måste vara <span class="font-bold text-md">giltliga ord</span>
			<div>
				<div class="mx-6 my-4 flex flex-col gap-4">
					<div class="flex wrong-guess items-center">
						<div class="flex gap-[0.08em] animate-shake">
							{#each 'asdff' as char, index}
								<Tile state={TileState.Unknown} {index} character={char} />
							{/each}
						</div>
						<div class="ml-4">❌</div>
					</div>
					<div class="flex items-center">
						<div class="flex gap-[0.08em]">
							{#each 'tokig' as char, index}
								<Tile state={TileState.Unknown} {index} character={char} />
							{/each}
						</div>
						<div class="ml-4">✅</div>
					</div>
				</div>
			</div>
		</li>
		<li class="m-1">
			Romerska siffror är <span class="font-bold text-md">exkluderade</span> från ordlistan
			<div>
				<div class="mx-6 my-4 flex flex-col gap-4">
					<div class="flex wrong-guess items-center">
						<div class="flex gap-[0.08em] animate-shake">
							{#each 'xxxix' as char, index}
								<Tile state={TileState.Unknown} {index} character={char} />
							{/each}
						</div>
						<div class="ml-4">❌</div>
					</div>
				</div>
			</div>
		</li>
		<li class="m-1">
			Brickornas färger ger dig ledtrådar om vilket ord som söks
			<div class="mx-6 flex flex-col my-4 gap-4">
				<div class="flex gap-[0.08em] items-center">
					{#each 'repad' as char, index}
						<Tile
							state={index === 4 ? TileState.Incorrect : TileState.Unknown}
							{index}
							character={char}
						/>
					{/each}
					<div class="flex gap-4 ml-4">
						<span>❌ Bokstav</span>
						<span>❌ Plats</span>
					</div>
				</div>
				<div class="flex gap-[0.08em] items-center">
					{#each 'orkan' as char, index}
						<Tile
							state={index === 2 ? TileState.WrongPlace : TileState.Unknown}
							{index}
							character={char}
						/>
					{/each}
					<div class="flex gap-4 ml-4">
						<span>✅ Bokstav</span>
						<span>❌ Plats</span>
					</div>
				</div>
				<div class="flex gap-[0.08em] items-center">
					{#each 'konst' as char, index}
						<Tile
							state={index === 0 ? TileState.Correct : TileState.Unknown}
							{index}
							character={char}
						/>
					{/each}
					<div class="flex gap-4 ml-4">
						<span>✅ Bokstav</span>
						<span>✅ Plats</span>
					</div>
				</div>
			</div>
		</li>
		<!-- Max guesses -->
		<li class="m-1">
			Du har <span class="font-bold text-md">6 försök</span> på dig att gissa ordet
			<div class="flex-1 mx-6 my-4 items-center flex">
				<div class="flex flex-col gap-[0.08em]">
					{#each EXAMPLE_WON_GAME_STATE as row, i}
						<div class="flex gap-[0.08em]">
							{#each row as tile, index}
								<Tile state={tile.state} {index} />
							{/each}
						</div>
					{/each}
				</div>
				<div class="ml-4">✅</div>
			</div>
		</li>
	</ul>
</article>

<style>
	.wrong-guess:hover .animate-shake {
		animation: shake 5s ease-in-out infinite;
		animation-delay: 200ms;
	}

	@keyframes shake {
		1%,
		9% {
			transform: translate3d(-1px, 0, 0);
		}

		2%,
		8% {
			transform: translate3d(2px, 0, 0);
		}

		3%,
		5%,
		7% {
			transform: translate3d(-4px, 0, 0);
		}

		4%,
		6% {
			transform: translate3d(4px, 0, 0);
		}

		10%,
		100% {
			transform: translate3d(0, 0, 0);
		}
	}
</style>

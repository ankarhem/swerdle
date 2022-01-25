<script lang="ts">
	import { expand, rotate } from './transitions';
	import { TileState } from './types';
	export let character: string;
	export let state: TileState;
	export let index: number;

	const getStateStyles = (state) => {
		switch (state) {
			case TileState.Correct:
				return 'bg-green-300 text-green-600 border-green-600';
			case TileState.WrongPlace:
				return 'bg-yellow-300 text-yellow-600 border-yellow-600';
			case TileState.Incorrect:
				return 'bg-neutral-300 text-neutral-600 border-neutral-600';
			case TileState.Unknown:
				return 'bg-primary-50 text-primary-500 border-primary-300';
			default:
				return '';
		}
	};

	$: stateStyles = getStateStyles(state);

	const duration = 200;
</script>

{#each [character] as c (c)}
	<div class="grid" in:expand|local={{ skip: character.length === 0 }}>
		{#each [state] as s (s)}
			<div
				in:rotate|local={{
					delay: 500 * index + duration,
					duration: duration
				}}
				out:rotate|local={{
					delay: 500 * index,
					duration: duration
				}}
				class={`col-start-1 row-start-1 text-5xl w-16 h-16 rounded border-2 transition-colors uppercase font-bold flex items-center justify-center ${stateStyles}`}
			>
				{character}
			</div>
		{/each}
	</div>
{/each}
<!-- </div> -->

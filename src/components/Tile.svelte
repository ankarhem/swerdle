<script lang="ts">
	import { getStateStyles } from '$lib/getStateStyles';
	import { TileState } from '$lib/types';
	import { expand, rotate, ROTATE_DURATION } from './transitions';
	export let character: string;
	export let state: TileState;
	export let index: number;

	$: stateStyles = getStateStyles(state);
</script>

{#if character.length > 0}
	<div class="grid" in:expand|local>
		{#if state === TileState.Unknown}
			<div
				out:rotate|local={{
					delay: ROTATE_DURATION * index
				}}
				class={`col-start-1 row-start-1 text-5xl w-16 h-16 rounded border-2 transition-colors uppercase font-bold flex items-center justify-center ${stateStyles}`}
			>
				{character}
			</div>
		{:else}
			<div
				in:rotate|local={{
					delay: ROTATE_DURATION * (index + 1)
				}}
				class={`col-start-1 row-start-1 text-5xl w-16 h-16 rounded border-2 transition-colors uppercase font-bold flex items-center justify-center ${stateStyles}`}
			>
				{character}
			</div>
		{/if}
	</div>
{:else}
	<div class="grid">
		<div
			class={`col-start-1 row-start-1 text-5xl w-16 h-16 rounded border-2 transition-colors uppercase font-bold flex items-center justify-center ${stateStyles}`}
		>
			{character}
		</div>
	</div>
{/if}

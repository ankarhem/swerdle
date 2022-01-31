<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Icon, X } from 'svelte-hero-icons';
	import { fade } from 'svelte/transition';
	export let open: boolean = false;
	export let title: string;
	export let transitionDelay: number = 0;
	const dispatch = createEventDispatcher();
</script>

{#if open}
	<div
		in:fade|local={{ delay: transitionDelay }}
		class="text-primary-500 modal z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center p-8 lg:p-0"
	>
		<div class="modal-overlay fixed w-full h-full bg-gray-900 opacity-50" />
		<div
			class="bg-white w-full lg:h-max md:w-1/2 lg:w-1/3  mx-auto rounded-lg shadow-xl z-50 overflow-y-auto"
		>
			<div class="flex justify-between items-center head bg-gray-100 py-2 px-8">
				<h3 class="text-2xl font-extrabold">{title}</h3>
				<button
					class="p-2 bg-gray-200 hover:bg-gray-300 rounded-full ml-4"
					on:click={() => {
						open = false;
						dispatch('close');
					}}
				>
					<Icon src={X} size="1.5rem" />
				</button>
			</div>
			<div class="content p-8">
				<slot />
			</div>
		</div>
	</div>
{/if}

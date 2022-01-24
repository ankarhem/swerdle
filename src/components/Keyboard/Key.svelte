<script lang="ts">
	export let key: string;
	export let specialKey: boolean = false;

	const handleClick: svelte.JSX.MouseEventHandler<HTMLButtonElement> = (event) => {
		console.log(key);
		if (!key || typeof window === 'undefined') return;

		window.dispatchEvent(
			new KeyboardEvent('keydown', {
				key: key
			})
		);
	};
</script>

<button
	class={`border flex items-center justify-center py-4 rounded uppercase text-neutral-600 font-bold border-neutral-600 ${
		specialKey === false
			? 'bg-neutral-100'
			: 'col-span-2 bg-neutral-300 text-neutral-700 border-neutral-700'
	}`}
	on:click={handleClick}
>
	<slot>
		{key}
	</slot>
</button>

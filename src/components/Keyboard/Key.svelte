<script lang="ts">
	export let specialKey: boolean = false;

	const handleClick: svelte.JSX.MouseEventHandler<HTMLButtonElement> = (event) => {
		console.log(event.currentTarget.innerText);
	};
</script>

<button
	class={`flex items-center justify-center py-4 rounded uppercase text-white font-bold  ${
		specialKey === false ? 'w-10 bg-slate-400' : 'w-20 bg-slate-500'
	}`}
	on:click={handleClick}
>
	<slot />
</button>

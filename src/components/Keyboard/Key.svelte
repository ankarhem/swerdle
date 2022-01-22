<script lang="ts">
	export let specialKey: boolean = false;
</script>

<button
	class={`flex items-center justify-center py-4 rounded uppercase text-white font-bold  ${
		specialKey === false ? 'w-10 bg-slate-400' : 'w-20 bg-slate-500'
	}`}
>
	<slot />
</button>

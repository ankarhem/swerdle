<script lang="ts">
	import { ChartBar, Icon, QuestionMarkCircle } from 'svelte-hero-icons';
</script>

<div
	class="px-3 py-0.5 pt-safe bg-green-100  border-b-[3px] border-b-green-400 flex justify-center items-center"
>
	<a href="/hjalp" class="text-gray-500">
		<Icon src={QuestionMarkCircle} size="1.5rem" />
	</a>
	<h1 class="hover:cursor-pointer text-5xl uppercase text-gray-500 font-abril mx-auto">
		<a href="/">
			<span class="text-green-500">Ordlig</span>
		</a>
	</h1>
	<a href="/statistik" class="text-gray-500">
		<Icon src={ChartBar} size="1.5rem" />
	</a>
</div>

<script lang="ts">
	import { ChartBar, Icon, QuestionMarkCircle } from 'svelte-hero-icons';
</script>

<div
	class="px-3 py-0.5 pt-safe bg-green-100  border-b-[3px] border-b-green-400 flex justify-between items-center"
>
	<a href="/hjalp" class="text-gray-500">
		<Icon src={QuestionMarkCircle} size="1.5rem" />
	</a>
	<div class="flex items-center flex-col uppercase text-gray-500 ">
		<h1 class="hover:cursor-pointer text-5xl font-abril mx-auto">
			<a href="/" class="flex font-bold">
				<span class="text-blue-400">S</span>
				<span class="text-yellow-400">W</span>
				<span class="text-blue-400">E</span>
				<span class="text-green-500">rdle</span>
			</a>
		</h1>
		<div class="text-xs block translate-y-[-0.2rem] transform-gpu">Wordle på svenska</div>
	</div>
	<a href="/statistik" class="text-gray-500">
		<Icon src={ChartBar} size="1.5rem" />
	</a>
</div>

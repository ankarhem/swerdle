<script lang="ts">
	import { Backspace, Icon } from 'svelte-hero-icons';
	import Key from './Key.svelte';

	let firstRow = 'qwertyuiopå';
	let middleRow = 'asdfghjklöä';
	let bottomRow = 'zxcvbnm';
</script>

<div class="max-w-md w-full p-2">
	<div class="grid grid-cols-11 gap-1">
		{#each firstRow as char}
			<Key>
				{char}
			</Key>
		{/each}
		{#each middleRow as char}
			<Key>
				{char}
			</Key>
		{/each}
		<Key specialKey>enter</Key>
		{#each bottomRow as char}
			<Key>
				{char}
			</Key>
		{/each}
		<Key specialKey>
			<Icon src={Backspace} size="1.5rem" />
		</Key>
	</div>
</div>

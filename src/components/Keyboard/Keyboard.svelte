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
			<Key key={char} />
		{/each}
		{#each middleRow as char}
			<Key key={char} />
		{/each}
		<Key specialKey key="Enter">enter</Key>
		{#each bottomRow as char}
			<Key key={char} />
		{/each}
		<Key specialKey key="Backspace">
			<Icon src={Backspace} size="1.5rem" />
		</Key>
	</div>
</div>

<script lang="ts">
	import { Backspace, Icon } from 'svelte-hero-icons';
	import Key from './Key.svelte';
	import Keyrow from './Keyrow.svelte';

	let firstRow = 'qwertyuiopå';
	let middleRow = 'asdfghjklöä';
	let bottomRow = 'zxcvbnm';
</script>

<div class="flex flex-col gap-1">
	<Keyrow>
		{#each firstRow as char}
			<Key>
				{char}
			</Key>
		{/each}
	</Keyrow>
	<Keyrow>
		{#each middleRow as char}
			<Key>
				{char}
			</Key>
		{/each}
	</Keyrow>
	<Keyrow>
		<Key specialKey>enter</Key>
		{#each bottomRow as char}
			<Key>
				{char}
			</Key>
		{/each}
		<Key specialKey>
			<Icon src={Backspace} size="1.5rem" />
		</Key>
	</Keyrow>
</div>

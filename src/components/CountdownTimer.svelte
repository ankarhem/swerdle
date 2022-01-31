<script lang="ts">
	import { onMount } from 'svelte';

	let today = new Date();
	const tomorrow = new Date();
	tomorrow.setDate(today.getDate() + 1);
	tomorrow.setHours(0, 0, 0, 0);

	let timer;
	$: {
		if (tomorrow.getTime() <= today.getTime()) {
			if (timer) {
				clearInterval(timer);
				timer = null;
			}
		}
	}
	onMount(() => {
		timer = setInterval(() => {
			today = new Date();
		}, 1000);
	});

	$: hoursLeft = Math.floor((tomorrow.getTime() - today.getTime()) / 1000 / 60 / 60)
		.toString()
		.padStart(2, '0');
	$: minutesLeft = (Math.floor((tomorrow.getTime() - today.getTime()) / 1000 / 60) % 60)
		.toString()
		.padStart(2, '0');
	$: secondsLeft = (Math.floor((tomorrow.getTime() - today.getTime()) / 1000) % 60)
		.toString()
		.padStart(2, '0');
</script>

<div class="text-3xl font-bold">
	{`${hoursLeft}:${minutesLeft}:${secondsLeft}`}
</div>

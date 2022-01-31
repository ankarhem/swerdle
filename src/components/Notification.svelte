<script lang="ts">
	import { cubicInOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	// TODO: use correct types
	export let notification: {
		type?: 'success' | 'error' | 'warning';
		text: string;
	};
	// export let onRemove = null;

	const getNotificationStyles = (type?: 'success' | 'warning' | 'error') => {
		switch (type) {
			case 'success':
				return 'bg-green-300 text-neutral-600 border-green-600';
			case 'error':
				return 'bg-red-300 text-neutral-600 border-red-600';
			case 'warning':
				return 'bg-yellow-300 text-neutral-600 border-yellow-600';
			default:
				return 'bg-neutral-300 text-neutral-600 border-neutral-600';
		}
	};
</script>

<div
	transition:fly={{
		y: -35,
		easing: cubicInOut
	}}
	class={`uppercase font-bold translate-y-14 flex h-9 p-4 border-2 items-center rounded ${getNotificationStyles(
		notification.type
	)}`}
>
	{notification.text}
</div>

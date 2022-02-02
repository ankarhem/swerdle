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
				return 'bg-green-300 text-green-600 border-green-600 dark:bg-green-700 dark:text-green-400 dark:border-green-400';
			case 'error':
				return 'bg-red-300 text-neutral-600 border-red-600 dark:bg-red-700 dark:text-red-400 dark:border-red-400';
			case 'warning':
				return 'bg-yellow-300 text-yellow-600 border-yellow-600 dark:bg-yellow-700 dark:text-yellow-500 dark:border-yellow-500';
			default:
				return 'bg-neutral-300 text-neutral-600 border-neutral-600 dark:bg-neutral-700 dark:text-neutral-400 dark:border-neutral-400';
		}
	};
</script>

<div
	transition:fly={{
		y: -35,
		easing: cubicInOut
	}}
	class={`uppercase font-bold translate-y-32 whitespace-nowrap flex h-12 text-xl p-4 border-2 items-center rounded ${getNotificationStyles(
		notification.type
	)}`}
>
	{notification.text}
</div>

<script lang="ts">
	import Notifications from 'svelte-notifications';
	import Header from '../components/Header.svelte';
	import Notification from '../components/Notification.svelte';
	import '../tailwind.css';

	const Component = Notification as any;
</script>

<Notifications item={Component}>
	<!-- <div class=""> -->
	<Header />
	<main class="w-full flex flex-col items-center flex-1">
		<slot />
	</main>
	<!-- </div> -->
</Notifications>

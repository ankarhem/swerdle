<script>
	import Header from '../components/Header.svelte';
	import '../tailwind.css';
</script>

<div class="w-full h-screen flex flex-col items-center">
	<Header />
	<slot />
</div>

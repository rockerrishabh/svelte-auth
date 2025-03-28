<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>Blog App</title>
</svelte:head>

{@render children()}

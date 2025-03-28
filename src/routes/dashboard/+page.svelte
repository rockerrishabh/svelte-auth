<script>
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>Dashboard</title>
</svelte:head>

<h1>Dashboard</h1>
<p>{page.data.session?.user?.name}</p>

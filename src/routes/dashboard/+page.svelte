<script>
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>Dashboard</title>
</svelte:head>

<h1 class="my-6 text-center text-4xl font-bold text-gray-800">Dashboard</h1>
<a href="/" class="text-blue-500 underline hover:text-blue-700">Home</a>
<p class="mt-4 text-center text-lg font-medium text-gray-700">
	{page.data.session?.user?.name}
</p>

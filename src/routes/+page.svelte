<script lang="ts">
	import { SignIn } from '@auth/sveltekit/components';
</script>

<svelte:head>
	<title>Blog App</title>
</svelte:head>

<h1 style="color: blue; font-size: 2rem; text-align: center;">Welcome to SvelteKit</h1>
<a href="/dashboard" style="color: green; text-decoration: none; font-weight: bold;">Dashboard</a>
<div class="mt-8 flex justify-center">
	<SignIn
		provider="github"
		signInPage="signin"
		options={{ redirectTo: '/dashboard' }}
		class="rounded-lg border border-gray-300 bg-gray-100 p-4 shadow-md"
	/>
</div>

<script lang="ts">
	import { SignIn } from '@auth/sveltekit/components';
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<SignIn provider="github" signInPage="signin" />

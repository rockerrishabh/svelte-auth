<script lang="ts">
	import { SignIn } from '@auth/sveltekit/components';
</script>

<h1>Welcome to SvelteKit</h1>
<a href="/dashboard">Dashboard</a>
<SignIn provider="github" signInPage="signin" options={{ redirectTo: '/dashboard' }} />

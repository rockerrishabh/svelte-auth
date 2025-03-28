<script>
	import { page } from '$app/state';
</script>

<h1>Dashboard</h1>
<p>{page.data.session?.user?.name}</p>

<script>
	import { onMount } from 'svelte';

	// Initialize darkMode based on localStorage, default to false (light mode)
	let darkMode = false;

	// When the component mounts, read the saved preference
	onMount(() => {
		darkMode = localStorage.getItem('theme') === 'dark';
		updateTheme();
	});

	// Toggle the dark mode state and persist the change
	function toggleDarkMode() {
		darkMode = !darkMode;
		localStorage.setItem('theme', darkMode ? 'dark' : 'light');
		updateTheme();
	}

	// Update the document root class based on darkMode value
	function updateTheme() {
		if (darkMode) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}
</script>

<!-- The button styles use Tailwind classes -->
<button on:click={toggleDarkMode} class="rounded p-2 focus:outline-none">
	{#if darkMode}
		<!-- Moon icon: indicating dark mode is active -->
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-6 w-6 text-yellow-300"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"
			/>
		</svg>
	{:else}
		<!-- Sun icon: indicating light mode is active -->
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-6 w-6 text-yellow-500"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M12 3v1m0 16v1m8.66-9h-1M4.34 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M12 8a4 4 0 100 8 4 4 0 000-8z"
			/>
		</svg>
	{/if}
</button>

<script>
	import Sidebar from './Sidebar.svelte';
	import ToggleTheme from './ToggleTheme.svelte';
</script>

<header class="bg-slate-50 px-4 py-3 text-slate-950 shadow-md dark:bg-slate-950 dark:text-slate-50">
	<div class="mx-auto flex max-w-7xl items-center justify-between gap-4">
		<a href="/" class="rounded text-xl font-bold hover:scale-105" aria-label="Home">
			Blog <span class="text-sky-700 dark:text-sky-300">App</span>
		</a>

		<nav class="hidden items-center gap-8 md:flex" aria-label="Main Navigation">
			<ul class="flex gap-6 text-sm font-medium">
				<li>
					<a
						class="rounded transition-colors hover:text-sky-700 dark:hover:text-sky-300"
						href="/about-us"
						aria-label="About page"
					>
						About
					</a>
				</li>
				<li>
					<a
						class="rounded transition-colors hover:text-sky-700 dark:hover:text-sky-300"
						href="/contact-us"
						aria-label="Contact page"
					>
						Contact
					</a>
				</li>
			</ul>
			<section class="flex items-center gap-4" aria-label="User actions">
				<ToggleTheme />
				<a
					href="/sign-in"
					class="cursor-pointer rounded-lg bg-sky-700 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-sky-800 focus:ring-2 focus:ring-sky-400 focus:outline-none dark:bg-sky-500 dark:text-white dark:hover:bg-sky-600 dark:focus:ring-sky-300"
					aria-label="Sign In"
				>
					Sign In
				</a>
				<a
					href="/sign-up"
					class="cursor-pointer rounded-lg bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-900 transition-all hover:bg-slate-200 focus:ring-2 focus:ring-slate-500 focus:outline-none dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
					aria-label="Sign Up"
				>
					Sign Up
				</a>
			</section>
		</nav>
		<Sidebar />
	</div>
</header>

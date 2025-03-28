<script lang="ts">
	// Disable SSR for this component so document is only referenced in the browser
	export const ssr = false;

	import { onMount } from 'svelte';
	import ToggleTheme from './ToggleTheme.svelte';

	let isOpen = $state(false);
	let sidebarRef: HTMLElement | null = null;
	let triggerRef: HTMLButtonElement | null = null;

	const toggleOpen = () => {
		isOpen = !isOpen;
	};

	const handleOutsideClick = (event: MouseEvent) => {
		// Check if the click is outside the sidebar and trigger button
		if (
			isOpen &&
			sidebarRef &&
			triggerRef &&
			!sidebarRef.contains(event.target as Node) &&
			!triggerRef.contains(event.target as Node)
		) {
			isOpen = false;
		}
	};

	onMount(() => {
		// Add click event listener to the document
		document.addEventListener('click', handleOutsideClick);

		// Cleanup function to remove event listener
		return () => {
			document.removeEventListener('click', handleOutsideClick);
		};
	});
</script>

<section class="flex md:hidden">
	<button
		bind:this={triggerRef}
		onclick={toggleOpen}
		aria-label="Open Sidebar"
		class="cursor-pointer"
	>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
			<path
				fill-rule="evenodd"
				d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
				clip-rule="evenodd"
			/>
		</svg>
	</button>

	<div
		class={{
			'fixed inset-0 backdrop-blur-sm transition-opacity': true,
			'pointer-events-auto opacity-100': isOpen,
			'pointer-events-none opacity-0': !isOpen
		}}
	></div>

	<aside
		bind:this={sidebarRef}
		class={{
			'fixed top-0 right-0 h-screen w-64 transform bg-slate-50 px-4 shadow-md transition-transform dark:bg-slate-900': true,
			'translate-x-0': isOpen,
			'translate-x-full': !isOpen
		}}
	>
		<section class="flex items-center justify-between">
			<button onclick={toggleOpen} aria-label="Close Sidebar" class="cursor-pointer p-3">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="size-6"
				>
					<path
						fill-rule="evenodd"
						d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
						clip-rule="evenodd"
					/>
				</svg>
			</button>
		</section>

		<nav class="mt-4 flex flex-col gap-6">
			<ul class="flex flex-col gap-2">
				<li>
					<a
						href="/about-us"
						class="block rounded-lg p-3 text-sm font-medium transition-colors hover:bg-slate-100 hover:text-sky-700 dark:hover:bg-slate-800 dark:hover:text-sky-300"
					>
						About
					</a>
				</li>
				<li>
					<a
						href="/contact-us"
						class="block rounded-lg p-3 text-sm font-medium transition-colors hover:bg-slate-100 hover:text-sky-700 dark:hover:bg-slate-800 dark:hover:text-sky-300"
					>
						Contact
					</a>
				</li>
			</ul>
			<section class="space-y-4">
				<div class="">
					<ToggleTheme />
				</div>
				<a
					href="/sign-in"
					class="block w-full cursor-pointer rounded-lg bg-sky-700 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-sky-800 focus:ring-2 focus:ring-sky-400 focus:outline-none dark:bg-sky-500 dark:text-white dark:hover:bg-sky-600 dark:focus:ring-sky-300"
					aria-label="Sign In"
				>
					Sign In
				</a>
				<a
					href="/sign-up"
					class="block w-full cursor-pointer rounded-lg bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-900 transition-all hover:bg-slate-200 focus:ring-2 focus:ring-slate-500 focus:outline-none dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 dark:focus:ring-slate-400"
					aria-label="Sign Up"
				>
					Sign Up
				</a>
			</section>
		</nav>
	</aside>
</section>

<script lang="ts">
	import { page } from '$app/state';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import type { PageProps } from './$types';
	import { superForm } from 'sveltekit-superforms';
	import { SignUpSchema } from './schema';

	let { data }: PageProps = $props();

	const { form, errors, message, constraints, enhance, delayed } = superForm(data.form, {
		validators: zodClient(SignUpSchema),
		validationMethod: 'onblur',
		id: 'sign-up'
	});
</script>

<svelte:head>
	<title>Sign Up</title>
</svelte:head>

<main class="mx-auto max-w-md p-8 md:max-w-lg lg:max-w-xl">
	<h1 class="mb-6 text-2xl font-bold">Create Your Account</h1>
	<form method="POST" class="space-y-4" aria-label="Sign up form" use:enhance>
		<div>
			<label for="name" class="block text-sm font-medium text-slate-700 dark:text-slate-200">
				Name
			</label>

			<input
				id="name"
				name="name"
				type="text"
				placeholder="Your Name"
				bind:value={$form.name}
				aria-invalid={$errors.name ? 'true' : undefined}
				{...$constraints.name}
				required
				class="mt-1 block w-full rounded-md border border-slate-300 bg-white p-2 text-slate-900 shadow-sm focus:ring-2 focus:ring-sky-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
			/>

			{#if $errors.name}<span class="mt-1 text-xs text-red-600">{$errors.name}</span>{/if}
		</div>

		<div>
			<label for="email" class="block text-sm font-medium text-slate-700 dark:text-slate-200">
				Email
			</label>

			<input
				id="email"
				name="email"
				type="email"
				bind:value={$form.email}
				aria-invalid={$errors.email ? 'true' : undefined}
				{...$constraints.email}
				placeholder="Your Email Address"
				required
				class="mt-1 block w-full rounded-md border border-slate-300 bg-white p-2 text-slate-900 shadow-sm focus:ring-2 focus:ring-sky-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
			/>

			{#if $errors.email}<span class="mt-1 text-xs text-red-600">{$errors.email}</span>{/if}
		</div>

		<div>
			<label for="password" class="block text-sm font-medium text-slate-700 dark:text-slate-200">
				Password
			</label>

			<input
				id="password"
				name="password"
				type="password"
				bind:value={$form.password}
				aria-invalid={$errors.password ? 'true' : undefined}
				{...$constraints.password}
				placeholder="Your New Password"
				required
				class="mt-1 block w-full rounded-md border border-slate-300 bg-white p-2 text-slate-900 shadow-sm focus:ring-2 focus:ring-sky-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
			/>

			{#if $errors.password}<span class="mt-1 text-xs text-red-600">{$errors.password}</span>{/if}
		</div>

		<div>
			<label
				for="confirmPassword"
				class="block text-sm font-medium text-slate-700 dark:text-slate-200"
			>
				Confirm Password
			</label>

			<input
				id="confirmPassword"
				name="confirmPassword"
				type="password"
				bind:value={$form.confirmPassword}
				aria-invalid={$errors.confirmPassword ? 'true' : undefined}
				{...$constraints.confirmPassword}
				placeholder="Confirm Your Password"
				required
				class="mt-1 block w-full rounded-md border border-slate-300 bg-white p-2 text-slate-900 shadow-sm focus:ring-2 focus:ring-sky-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
			/>
			{#if $errors.confirmPassword}<span class="mt-1 text-xs text-red-600"
					>{$errors.confirmPassword}</span
				>{/if}
		</div>
		<div class="flex items-center">
			<input
				id="terms"
				name="terms"
				type="checkbox"
				required
				class="cursor-pointer rounded border-slate-300 text-sky-600 focus:ring-sky-500 focus:ring-offset-1 dark:border-slate-700 dark:bg-slate-800"
				aria-describedby="terms-description"
			/>

			<pre class="mt-1 text-xs text-red-600"></pre>

			<div class="ml-3 text-sm">
				<label for="terms" class="font-medium text-slate-700 dark:text-slate-200">
					I agree to the{' '}
					<a
						href="/terms"
						class="text-sky-700 hover:underline focus:ring-2 focus:ring-sky-500 focus:outline-none dark:text-sky-300"
						aria-label="Terms and Conditions"
					>
						Terms and Conditions
					</a>
				</label>
			</div>
		</div>

		{#if $message}
			<div
				class="w-full items-center rounded-lg border p-4 text-sm"
				class:border-green-200={page.status === 200}
				class:bg-green-50={page.status === 200}
				class:text-green-600={page.status === 200}
				class:border-red-200={page.status >= 400}
				class:bg-red-50={page.status >= 400}
				class:text-red-600={page.status >= 400}
			>
				{$message}
			</div>
		{/if}

		<div class="pt-2">
			<button
				disabled={$delayed}
				type="submit"
				class="w-full cursor-pointer rounded-lg bg-sky-800 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-sky-900 focus:ring-2 focus:ring-sky-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-slate-700 dark:bg-sky-600 dark:hover:bg-sky-700"
				aria-label="Sign Up"
			>
				Sign Up
			</button>
		</div>

		<p class="mt-4 text-sm">
			Already have an account?{' '}
			<a
				href="/sign-in"
				class="font-medium text-sky-700 hover:underline focus:ring-2 focus:ring-sky-500 focus:outline-none dark:text-sky-300"
				aria-label="Sign In"
			>
				Sign In
			</a>
		</p>
	</form>
</main>

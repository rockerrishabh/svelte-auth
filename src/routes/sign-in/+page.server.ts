import { message, superValidate, type Infer } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { SignInSchema } from './schema';

export const load: PageServerLoad = async () => {
	return { form: await superValidate(zod(SignInSchema)) };
};

export const actions = {
	default: async (event) => {
		const form = await superValidate<Infer<typeof SignInSchema>, string>(
			event.request,
			zod(SignInSchema)
		);
		console.log(form);

		if (!form.valid) return message(form, 'Invalid form data', { status: 400 });
		return message(form, 'Signed In successfully!');
	}
} satisfies Actions;

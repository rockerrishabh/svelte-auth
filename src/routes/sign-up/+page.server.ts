import type { Actions, PageServerLoad } from './$types';
import { zod, type Infer } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms';
import { message } from 'sveltekit-superforms/server';
import { SignUpSchema } from './schema';

export const load: PageServerLoad = async () => {
	return { form: await superValidate(zod(SignUpSchema)) };
};

export const actions = {
	default: async (event) => {
		const form = await superValidate<Infer<typeof SignUpSchema>, string>(
			event.request,
			zod(SignUpSchema)
		);
		console.log(form);

		if (!form.valid) return message(form, 'Invalid form data', { status: 400 });
		return message(form, 'Signed Up successfully!');
	}
} satisfies Actions;

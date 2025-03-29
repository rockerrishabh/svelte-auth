import { message, superValidate, type Infer } from 'sveltekit-superforms';
import crypto from 'crypto';
import { eq } from 'drizzle-orm';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';
import { SignInSchema } from './schema';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schemas/users';

export const load: PageServerLoad = async () => {
	return { form: await superValidate(zod(SignInSchema)) };
};

export const actions = {
	default: async (event) => {
		const form = await superValidate<Infer<typeof SignInSchema>, string>(
			event.request,
			zod(SignInSchema)
		);

		if (!form.valid) return message(form, 'Invalid form data', { status: 400 });
		try {
			const existingUser = await db.query.users.findFirst({
				where: eq(users.email, form.data.email)
			});

			if (!existingUser) {
				return message(form, 'User not found', { status: 400 });
			}

			if (!existingUser.hashedPassword || !existingUser.salt) {
				return message(form, 'User used a different provider to sign up', { status: 400 });
			}

			const hashedPassword = crypto
				.pbkdf2Sync(form.data.password, existingUser.salt, 1000, 64, `sha512`)
				.toString(`hex`);

			if (hashedPassword !== existingUser.hashedPassword) {
				return message(form, 'Password is incorrect', { status: 400 });
			}

			event.cookies.set('session', existingUser.id, {
				path: '/',
				httpOnly: true,
				sameSite: 'lax',
				secure: process.env.NODE_ENV === 'production',
				expires: new Date(Date.now() + 60 * 60 * 24 * 7 * 1000), // 7 days expiration
				priority: 'high'
			});

			return message(form, 'Signed In successfully!');
		} catch (error) {
			return message(form, `Internal Server Error:- ${JSON.stringify(error, null, 2)}`, {
				status: 500
			});
		}
	}
} satisfies Actions;

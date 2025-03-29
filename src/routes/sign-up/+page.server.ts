import { zod, type Infer } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms';
import { message } from 'sveltekit-superforms/server';
import { eq } from 'drizzle-orm';
import crypto from 'crypto';
import type { Actions, PageServerLoad } from './$types';
import { SignUpSchema } from './schema';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schemas/users';
import { accounts } from '$lib/server/db/schemas/accounts';

export const load: PageServerLoad = async () => {
	return { form: await superValidate(zod(SignUpSchema)) };
};

export const actions = {
	default: async (event) => {
		const form = await superValidate<Infer<typeof SignUpSchema>, string>(
			event.request,
			zod(SignUpSchema)
		);

		if (!form.valid) return message(form, 'Invalid form data', { status: 400 });

		try {
			const existingUser = await db.query.users.findFirst({
				where: eq(users.email, form.data.email)
			});

			if (existingUser) {
				return message(form, 'User already exists', { status: 403 });
			}

			const salt = crypto.randomBytes(16).toString('hex');

			const hashedPassword = crypto
				.pbkdf2Sync(form.data.password, salt, 1000, 64, `sha512`)
				.toString(`hex`);

			const [newUser] = await db
				.insert(users)
				.values({
					name: form.data.name,
					email: form.data.email,
					salt,
					hashedPassword
				})
				.returning();

			if (!newUser) {
				return message(form, 'User not created', { status: 405 });
			}

			const [newAccount] = await db
				.insert(accounts)
				.values({
					provider: 'Credentials',
					userId: newUser.id
				})
				.returning();

			if (!newAccount) {
				return message(form, 'Error while creating account', { status: 405 });
			}
			return message(form, 'Signed Up successfully!');
		} catch (error) {
			return message(form, `Internal Server Error:- ${JSON.stringify(error, null, 2)}`, {
				status: 500
			});
		}
	}
} satisfies Actions;

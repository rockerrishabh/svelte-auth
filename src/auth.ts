import { db } from '$lib/server/db';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { SvelteKitAuth, type DefaultSession } from '@auth/sveltekit';
import GitHub from '@auth/sveltekit/providers/github';

declare module '@auth/sveltekit' {
	interface Session {
		user: {
			userId: string;
			/**
			 * By default, TypeScript merges new interface properties and overwrites existing ones.
			 * In this case, the default session user properties will be overwritten,
			 * with the new ones defined above. To keep the default session user properties,
			 * you need to add them back into the newly declared interface.
			 */
		} & DefaultSession['user'];
	}
}

export const { handle, signIn, signOut } = SvelteKitAuth({
	adapter: DrizzleAdapter(db),
	trustHost: true,
	providers: [GitHub],
	callbacks: {
		session: async ({ session, token }) => {
			if (token) {
				session.user.userId = token.sub!;
			}
			// `session.user.userId` is now a valid property, and will be type-checked
			// in places like `useSession().data.user` or `auth().user`
			return session;
		}
	}
});

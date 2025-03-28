import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.auth();

	if (session?.user?.name) {
		return redirect(303, `/dashboard`);
	}

	return {
		session
	};
};

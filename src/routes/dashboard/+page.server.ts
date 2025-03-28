import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.auth();

	console.log(session);

	if (!session?.user?.id) {
		return redirect(303, `/`);
	}

	return {
		session
	};
};

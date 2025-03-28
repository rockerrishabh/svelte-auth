import { redirect } from '@sveltejs/kit';
import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async (events) => {
	const session = await events.locals.auth();

	if (!session?.user?.id) {
		redirect(303, `/`);
	}

	return {
		session
	};
};

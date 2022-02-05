import { getCurrentWordRow } from '$lib/validate';

/** @type {import('@sveltejs/kit').RequestHandler} */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function get() {
	const currentWord = getCurrentWordRow();

	return {
		status: 200,
		body: {
			id: currentWord.id
		}
	};
}

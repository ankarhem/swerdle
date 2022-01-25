import wordlist_5 from './ordlista_5.json';

/** @type {import('@sveltejs/kit').RequestHandler} */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function get() {
	try {
		const firstDay = '2022-01-24T21:32:46.418Z';
		const date = new Date();

		// get diff in days
		const diff = Math.floor(
			(date.getTime() - new Date(firstDay).getTime()) / (1000 * 60 * 60 * 24)
		);
		const dailyWord = wordlist_5[diff];

		console.log(dailyWord);
		return {
			status: 200,
			body: {
				word: dailyWord
			}
		};
	} catch {
		return {
			status: 500,
			body: {
				message: 'Could not retrieve daily word'
			}
		};
	}
}

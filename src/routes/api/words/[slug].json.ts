export async function get({ params }: { params: { slug: string } }) {
	console.log(params.slug);
	if (!params.slug) {
		return {
			status: 400,
			body: {
				error: 'Bad Request',
				message: 'Missing slug'
			}
		};
	}
}

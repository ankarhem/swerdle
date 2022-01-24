const FIVE_LETTER_WORDS_FILE = 'ordlista_5.txt';

// function get_line(filename, line_no, callback) {
// 	fs.readFile(path.resolve(filename), function (err, data) {
// 		if (err) throw err;

// 		// Data is a buffer that we need to convert to a string
// 		// Improvement: loop over the buffer and stop when the line is reached
// 		const lines = data.toString('utf-8').split('\n');

// 		if (+line_no > lines.length) {
// 			return callback('File end reached without finding line', null);
// 		}

// 		callback(null, lines[+line_no]);
// 	});
// }

/** @type {import('@sveltejs/kit').RequestHandler} */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function get() {
	const firstDay = '2022-01-24T21:32:46.418Z';
	// get current date
	const date = new Date();
	// difference in days
	const diff = Math.floor((date.getTime() - new Date(firstDay).getTime()) / (1000 * 60 * 60 * 24));

	// get_line(FIVE_LETTER_WORDS_FILE, diff, function (err, line) {
	// 	console.log('The line: ' + line);
	// });

	return {
		status: 200
	};
}

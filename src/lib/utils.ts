export function requestFullscreen() {
	const doc = window.document as any;
	const docEl = doc.documentElement as any;

	const requestFullScreen =
		docEl.requestFullscreen ||
		docEl.mozRequestFullScreen ||
		docEl.webkitRequestFullScreen ||
		docEl.msRequestFullscreen;
	// const cancelFullScreen =
	// 	doc.exitFullscreen ||
	// 	doc.mozCancelFullScreen ||
	// 	doc.webkitExitFullscreen ||
	// 	doc.msExitFullscreen;

	if (
		!doc.fullscreenElement &&
		!doc.mozFullScreenElement &&
		!doc.webkitFullscreenElement &&
		!doc.msFullscreenElement
	) {
		requestFullScreen.call(docEl);
	}
	//  else {
	// 	cancelFullScreen.call(doc);
	// }
}

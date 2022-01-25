import { linear, quadOut } from 'svelte/easing';

export function rotate(node, params) {
	const existingTransform = getComputedStyle(node).transform.replace('none', '');

	if (params.skip) return;

	return {
		delay: params.delay || 0,
		duration: params.duration,
		easing: linear,
		css: (t, u) => `transform: ${existingTransform} rotateX(${u * 90}deg);`
	};
}

export function expand(node, params) {
	const existingTransform = getComputedStyle(node).transform.replace('none', '');

	if (params.skip) return;

	return {
		delay: 0,
		duration: 100,
		easing: quadOut,
		css: (t, u) => `transform: ${existingTransform} scale(${1 + 0.3 * (t > 0.5 ? 1 - t : 1 - u)})`
	};
}

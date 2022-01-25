import { linear, quadOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/types/runtime/transition';

export const ROTATE_DURATION = 300;

interface RotateParams {
	delay?: number;
	skip?: boolean;
}

export function rotate(node: Element, params: RotateParams): TransitionConfig {
	const existingTransform = getComputedStyle(node).transform.replace('none', '');

	if (params.skip) return;

	return {
		delay: params.delay || 0,
		duration: ROTATE_DURATION,
		easing: linear,
		css: (t, u) => `transform: ${existingTransform} rotateX(${u * 90}deg);`
	};
}

interface ExpandParams {
	skip?: boolean;
}

export function expand(node: Element, params: ExpandParams): TransitionConfig {
	const existingTransform = getComputedStyle(node).transform.replace('none', '');

	if (params.skip) return;

	return {
		delay: 0,
		duration: 100,
		easing: quadOut,
		css: (t, u) => `transform: ${existingTransform} scale(${1 + 0.3 * (t > 0.5 ? 1 - t : 1 - u)})`
	};
}

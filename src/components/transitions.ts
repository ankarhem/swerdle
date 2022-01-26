import { linear, quadOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/types/runtime/transition';

export const ROTATE_DURATION = 300;

interface RotateParams {
	delay?: number;
}

export function rotate(node: Element, params: RotateParams): TransitionConfig {
	const existingTransform = getComputedStyle(node).transform.replace('none', '');

	return {
		delay: params.delay || 0,
		duration: ROTATE_DURATION,
		easing: linear,
		css: (_t, u) => `transform: ${existingTransform} rotateX(${u * 90}deg);`
	};
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function expand(node: Element, _params: Record<never, never>): TransitionConfig {
	const existingTransform = getComputedStyle(node).transform.replace('none', '');

	return {
		delay: 0,
		duration: 100,
		easing: quadOut,
		css: (t, u) => `transform: ${existingTransform} scale(${1 + 0.3 * (t > 0.5 ? 1 - t : 1 - u)})`
	};
}

interface ShakeParams {
	duration?: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function shake(node: Element, params: ShakeParams): TransitionConfig {
	const existingTransform = getComputedStyle(node).transform.replace('none', '');

	return {
		delay: 0,
		duration: typeof params.duration === 'undefined' ? 600 : params.duration,
		easing: quadOut,
		css: (t, u) => `transform: ${existingTransform} translateX(${2 * Math.sin(u * 13)}px)`
	};
}

export type TransitionFunc = (node: Element, params: Record<string, unknown>) => TransitionConfig;

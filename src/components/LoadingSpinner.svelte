<script lang="ts">
	export let radius: string | number = 30;
</script>

<div
	class="absolute top-0 left-0 right-0 bottom-0 flex min-h-[50px] animate-fade-in items-center justify-center"
>
	<div class="h-5 w-5">
		<svg
			class="spinner"
			viewBox="0 0 66 66"
			xmlns="http://www.w3.org/2000/svg"
			aria-live="polite"
			aria-label={'Var god vänta...'}
		>
			<circle class="path" fill="none" cx="33" cy="33" r={radius} />
		</svg>
	</div>
</div>

<style>
	.spinner {
		animation: rotator 1.4s linear infinite;
	}

	.path {
		stroke-dasharray: 187;
		stroke-dashoffset: 0;
		transform-origin: center;
		stroke: currentColor;
		stroke-width: 6;
		stroke-linecap: round;
		animation: dash 1.4s ease-in-out infinite;
	}

	@keyframes rotator {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(270deg);
		}
	}

	@keyframes dash {
		0% {
			stroke-dashoffset: 187;
		}
		50% {
			stroke-dashoffset: 46.75;
			transform: rotate(135deg);
		}
		100% {
			stroke-dashoffset: 187;
			transform: rotate(450deg);
		}
	}
</style>

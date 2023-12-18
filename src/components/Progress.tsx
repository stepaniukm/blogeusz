import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";

function useReadingProgress() {
	const completion = useSignal(0);
	useVisibleTask$(({ cleanup }) => {
		function updateScrollCompletion() {
			const currentProgress = window.scrollY;
			const scrollHeight = document.body.scrollHeight - window.innerHeight;
			if (scrollHeight) {
				completion.value = Number((currentProgress / scrollHeight).toFixed(2)) * 100;
			}
		}
		document.addEventListener("scroll", updateScrollCompletion);

		cleanup(() => {
			document.removeEventListener("scroll", updateScrollCompletion);
		});
	});
	return completion;
}
export const Progress = component$(() => {
	const completion = useReadingProgress();
	return (
		<div class="rounded h-2 w-full sticky top-0 left-0">
			<div
				class="bg-skin-accent rounded h-full transition-width"
				style={{ width: `${completion.value}%` }}
			></div>
		</div>
	);
});

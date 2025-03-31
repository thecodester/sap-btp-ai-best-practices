import { useEffect } from "react";

export const useScrollReveal = ({
	elementSelector = ".scrollreveal",
	activeClass = "scrollreveal__active",
	revealTriggerOffset = 150,
	executeOnLoad = true,
	onLoadSkipTriggerOffset = false,
	onRevealTrigger = (element) => {},
	onEnterViewport = (element) => {},
	onExitViewport = (element) => {},
	removeActiveClassOnExitViewport = false
} = {}) => {
	useEffect(() => {
		const scrollHandler = ({ skipTriggerOffset = false } = {}) => {
			const elements = document.querySelectorAll(elementSelector);
			const viewportHeight = window.innerHeight;
			const viewportHeightWithOffset = viewportHeight - (skipTriggerOffset ? 0 : revealTriggerOffset);

			elements.forEach((element) => {
				const elementTopPosition = element.getBoundingClientRect().top;
				const elementBottomPosition = element.getBoundingClientRect().bottom;
				const isElementInViewport = removeActiveClassOnExitViewport
					? elementTopPosition < viewportHeightWithOffset && elementBottomPosition >= 0
					: elementTopPosition < viewportHeightWithOffset;

				if (isElementInViewport) {
					if (!element.classList.contains(activeClass)) {
						element.classList.add(activeClass);

						onEnterViewport(element);
						onRevealTrigger(element);
					}
				} else if (removeActiveClassOnExitViewport) {
					if (element.classList.contains(activeClass)) {
						element.classList.remove(activeClass);
						onExitViewport(element);
					}
				}
			});
		};

		window.addEventListener("scroll", scrollHandler);

		if (executeOnLoad) {
			scrollHandler({ skipTriggerOffset: onLoadSkipTriggerOffset });
		}

		// Clean up function
		return () => {
			window.removeEventListener("scroll", scrollHandler);
		};
	}, [elementSelector, activeClass, revealTriggerOffset, executeOnLoad, onRevealTrigger, removeActiveClassOnExitViewport]);
};

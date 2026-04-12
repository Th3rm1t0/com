import { useEffect, useRef, useState } from "react";

export const useBoxLazyLoad = (rootMargin = "200px") => {
	const [shouldLoad, setShouldLoad] = useState(false);
	const targetRef = useRef<HTMLElement>(null);

	useEffect(() => {
		if (shouldLoad) return;
		const target = targetRef.current;
		if (!target) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries.some((e) => e.isIntersecting)) {
					setShouldLoad(true);
					observer.disconnect();
				}
			},
			{ rootMargin },
		);

		observer.observe(target);
		return () => observer.disconnect();
	}, [shouldLoad, rootMargin]);

	return { targetRef, shouldLoad };
};

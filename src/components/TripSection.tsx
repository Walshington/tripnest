import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Trip } from "@/data/mockTrips";
import TripCard from "./TripCard";

interface TripSectionProps {
	title: string;
	subtitle?: string;
	trips: Trip[];
}

export default function TripSection({
	title,
	subtitle,
	trips,
}: TripSectionProps) {
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const [canScrollLeft, setCanScrollLeft] = useState(false);
	const [canScrollRight, setCanScrollRight] = useState(false);

	const checkScrollButtons = useCallback(() => {
		const container = scrollContainerRef.current;
		if (!container) return;

		setCanScrollLeft(container.scrollLeft > 0);
		setCanScrollRight(
			container.scrollLeft < container.scrollWidth - container.clientWidth - 10,
		);
	}, []);

	useEffect(() => {
		checkScrollButtons();
		const container = scrollContainerRef.current;
		if (container) {
			container.addEventListener("scroll", checkScrollButtons);
			window.addEventListener("resize", checkScrollButtons);
		}

		return () => {
			if (container) {
				container.removeEventListener("scroll", checkScrollButtons);
			}
			window.removeEventListener("resize", checkScrollButtons);
		};
	}, [checkScrollButtons]);

	const scroll = (direction: "left" | "right") => {
		const container = scrollContainerRef.current;
		if (!container) return;

		const scrollAmount = container.clientWidth * 0.8;
		const targetScroll =
			direction === "left"
				? container.scrollLeft - scrollAmount
				: container.scrollLeft + scrollAmount;

		container.scrollTo({
			left: targetScroll,
			behavior: "smooth",
		});
	};

	return (
		<section className="w-full py-8 px-4 sm:px-6 lg:px-8">
			<div className="max-w-[1760px] mx-auto">
				<div className="flex items-center justify-between mb-6">
					<div>
						<h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
						{subtitle && (
							<p className="text-sm text-gray-600 mt-1">{subtitle}</p>
						)}
					</div>

					<div className="flex items-center gap-2">
						<button
							type="button"
							onClick={() => scroll("left")}
							disabled={!canScrollLeft}
							className={`p-2 rounded-full border transition-all ${
								canScrollLeft
									? "border-gray-900 hover:bg-gray-100 text-gray-900"
									: "border-gray-200 text-gray-300 cursor-not-allowed"
							}`}
							aria-label="Scroll left"
						>
							<ChevronLeft size={16} />
						</button>
						<button
							type="button"
							onClick={() => scroll("right")}
							disabled={!canScrollRight}
							className={`p-2 rounded-full border transition-all ${
								canScrollRight
									? "border-gray-900 hover:bg-gray-100 text-gray-900"
									: "border-gray-200 text-gray-300 cursor-not-allowed"
							}`}
							aria-label="Scroll right"
						>
							<ChevronRight size={16} />
						</button>
					</div>
				</div>

			<div
				ref={scrollContainerRef}
				className="flex flex-row flex-nowrap gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
				style={{
					scrollbarWidth: "none",
					msOverflowStyle: "none",
				}}
			>
				{trips.map((trip) => (
					<TripCard key={trip.id} trip={trip} />
				))}
			</div>
			</div>
		</section>
	);
}

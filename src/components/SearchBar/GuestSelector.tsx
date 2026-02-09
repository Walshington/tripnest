import { Minus, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface GuestCounts {
	adults: number;
	children: number;
	infants: number;
	pets: number;
}

interface GuestSelectorProps {
	guests: GuestCounts;
	onChange: (guests: GuestCounts) => void;
}

interface GuestCounterProps {
	title: string;
	subtitle: string;
	category: keyof GuestCounts;
	count: number;
	onUpdate: (
		category: keyof GuestCounts,
		operation: "increment" | "decrement",
	) => void;
	min?: number;
	max?: number;
}

function GuestCounter({
	title,
	subtitle,
	category,
	count,
	onUpdate,
	min = 0,
	max = 16,
}: GuestCounterProps) {
	const canDecrement = count > min;
	const canIncrement = count < max;

	return (
		<div className="flex items-center justify-between py-4 border-b border-gray-200 last:border-b-0">
			<div className="flex-1">
				<div className="font-medium text-sm text-gray-900">{title}</div>
				<div className="text-xs text-gray-500">{subtitle}</div>
			</div>
			<div className="flex items-center gap-3">
				<button
					type="button"
					onClick={() => onUpdate(category, "decrement")}
					disabled={!canDecrement}
					className={`
						w-8 h-8 rounded-full border flex items-center justify-center transition-colors
						${canDecrement ? "border-gray-400 hover:border-gray-900 text-gray-700" : "border-gray-200 text-gray-300 cursor-not-allowed"}
					`}
				>
					<Minus size={16} />
				</button>
				<span className="w-8 text-center text-sm font-medium text-gray-900">
					{count}
				</span>
				<button
					type="button"
					onClick={() => onUpdate(category, "increment")}
					disabled={!canIncrement}
					className={`
						w-8 h-8 rounded-full border flex items-center justify-center transition-colors
						${canIncrement ? "border-gray-400 hover:border-gray-900 text-gray-700" : "border-gray-200 text-gray-300 cursor-not-allowed"}
					`}
				>
					<Plus size={16} />
				</button>
			</div>
		</div>
	);
}

export default function GuestSelector({
	guests,
	onChange,
}: GuestSelectorProps) {
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const formatGuestSummary = () => {
		const parts: string[] = [];
		const totalGuests = guests.adults + guests.children;

		if (totalGuests > 0) {
			parts.push(`${totalGuests} guest${totalGuests !== 1 ? "s" : ""}`);
		} else {
			parts.push("Add guests");
		}

		if (guests.infants > 0) {
			parts.push(`${guests.infants} infant${guests.infants !== 1 ? "s" : ""}`);
		}

		if (guests.pets > 0) {
			parts.push(`${guests.pets} pet${guests.pets !== 1 ? "s" : ""}`);
		}

		return parts.join(", ");
	};

	const updateCount = (
		category: keyof GuestCounts,
		operation: "increment" | "decrement",
	) => {
		const current = guests[category];
		const newValue =
			operation === "increment"
				? current + 1
				: Math.max(category === "adults" ? 1 : 0, current - 1);

		onChange({
			...guests,
			[category]: newValue,
		});
	};

	return (
		<div ref={containerRef} className="relative flex-1">
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				className="flex flex-col text-left w-full"
			>
				<span className="text-xs font-semibold text-gray-800 mb-1">Who</span>
				<span className="text-sm text-gray-800">{formatGuestSummary()}</span>
			</button>

			{isOpen && (
				<div className="absolute top-full right-0 mt-2 w-96 bg-white rounded-3xl shadow-xl border border-gray-200 p-6 z-50">
					<GuestCounter
						title="Adults"
						subtitle="Age 13+"
						category="adults"
						count={guests.adults}
						onUpdate={updateCount}
						min={1}
					/>
					<GuestCounter
						title="Children"
						subtitle="Ages 2-12"
						category="children"
						count={guests.children}
						onUpdate={updateCount}
					/>
					<GuestCounter
						title="Infants"
						subtitle="Under 2"
						category="infants"
						count={guests.infants}
						onUpdate={updateCount}
					/>
					<GuestCounter
						title="Pets"
						subtitle="Service animals"
						category="pets"
						count={guests.pets}
						onUpdate={updateCount}
					/>

					<div className="mt-6 pt-6 border-t border-gray-200 flex justify-end">
						<button
							type="button"
							onClick={() => setIsOpen(false)}
							className="text-sm font-semibold text-white bg-gray-900 hover:bg-gray-800 px-6 py-2 rounded-lg transition-colors"
						>
							Done
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

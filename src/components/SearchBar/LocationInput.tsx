import {
	Building2,
	Landmark,
	MapPin,
	Navigation,
	Umbrella,
} from "lucide-react";
import { type KeyboardEvent, useEffect, useRef, useState } from "react";
import type { Destination } from "@/data/mockTrips";

interface LocationInputProps {
	label: string;
	placeholder: string;
	value: string;
	onChange: (value: string) => void;
	suggestions: Destination[];
	onSelect: (destination: Destination) => void;
}

export default function LocationInput({
	label,
	placeholder,
	value,
	onChange,
	suggestions,
	onSelect,
}: LocationInputProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(-1);
	const containerRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

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

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (!isOpen) {
			if (e.key === "ArrowDown") {
				setIsOpen(true);
				setSelectedIndex(0);
				e.preventDefault();
			}
			return;
		}

		switch (e.key) {
			case "ArrowDown":
				setSelectedIndex((prev) =>
					prev < suggestions.length - 1 ? prev + 1 : prev,
				);
				e.preventDefault();
				break;
			case "ArrowUp":
				setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
				e.preventDefault();
				break;
			case "Enter":
				if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
					handleSelect(suggestions[selectedIndex]);
				}
				e.preventDefault();
				break;
			case "Escape":
				setIsOpen(false);
				setSelectedIndex(-1);
				break;
		}
	};

	const handleSelect = (destination: Destination) => {
		const displayName = destination.state
			? `${destination.city}, ${destination.state}`
			: destination.country
				? `${destination.city}, ${destination.country}`
				: destination.city;

		onChange(displayName);
		onSelect(destination);
		setIsOpen(false);
		setSelectedIndex(-1);
	};

	const getIcon = (icon: Destination["icon"]) => {
		const iconProps = { size: 20, className: "text-gray-600" };

		switch (icon) {
			case "nearby":
				return <Navigation {...iconProps} />;
			case "beach":
				return <Umbrella {...iconProps} />;
			case "city":
				return <Building2 {...iconProps} />;
			case "theme-park":
			case "culture":
			case "adventure":
				return <Landmark {...iconProps} />;
			default:
				return <MapPin {...iconProps} />;
		}
	};

	return (
		<div ref={containerRef} className="relative flex-1">
			<div className="flex flex-col">
				<span className="text-xs font-semibold text-gray-800 mb-1">
					{label}
				</span>
				<input
					ref={inputRef}
					type="text"
					placeholder={placeholder}
					value={value}
					onChange={(e) => onChange(e.target.value)}
					onFocus={() => setIsOpen(true)}
					onKeyDown={handleKeyDown}
					className="text-sm text-gray-800 placeholder:text-gray-500 bg-transparent border-none outline-none focus:outline-none w-full"
					aria-label={label}
				/>
			</div>

			{isOpen && (
				<div className="absolute top-full left-0 mt-2 w-96 bg-white rounded-3xl shadow-xl border border-gray-200 py-4 z-50">
					<div className="px-4 pb-2">
						<h3 className="text-xs font-semibold text-gray-500 uppercase">
							Suggested destinations
						</h3>
					</div>
					<div className="max-h-96 overflow-y-auto">
						{suggestions.map((destination, index) => {
							const displayName = destination.state
								? `${destination.city}, ${destination.state}`
								: destination.country
									? `${destination.city}, ${destination.country}`
									: destination.city;

							return (
								<button
									key={destination.id}
									type="button"
									onClick={() => handleSelect(destination)}
									onMouseEnter={() => setSelectedIndex(index)}
									className={`w-full flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition-colors ${
										selectedIndex === index ? "bg-gray-50" : ""
									}`}
								>
									<div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
										{getIcon(destination.icon)}
									</div>
									<div className="flex-1 text-left">
										<div className="font-medium text-sm text-gray-900">
											{displayName}
										</div>
										<div className="text-xs text-gray-500">
											{destination.description}
										</div>
									</div>
								</button>
							);
						})}
					</div>
				</div>
			)}
		</div>
	);
}

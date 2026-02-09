import { Heart, Star } from "lucide-react";
import { useState } from "react";
import type { Trip } from "@/data/mockTrips";

interface TripCardProps {
	trip: Trip;
}

export default function TripCard({ trip }: TripCardProps) {
	const [isFavorite, setIsFavorite] = useState(trip.isFavorite || false);

	const toggleFavorite = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setIsFavorite(!isFavorite);
	};

	const handleCardClick = () => {
		console.log("Trip clicked:", trip.id);
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			handleCardClick();
		}
	};

	return (
		<div
			role="button"
			tabIndex={0}
			onClick={handleCardClick}
			onKeyDown={handleKeyDown}
			className="flex-shrink-0 flex-grow-0 w-[320px] cursor-pointer group"
		>
			<div className="relative aspect-square rounded-xl overflow-hidden mb-3">
				<img
					src={trip.imageUrl}
					alt={trip.title}
					className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
				/>

				{/* Favorite Button */}
				<button
					type="button"
					onClick={toggleFavorite}
					className="absolute top-3 right-3 p-2 hover:scale-110 transition-transform z-10"
					aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
				>
					<Heart
						size={24}
						className={`${isFavorite ? "fill-[#FF385C] stroke-[#FF385C]" : "fill-white/70 stroke-white"} drop-shadow-md`}
					/>
				</button>

				{/* Guest Favorite Badge */}
				{trip.isGuestFavorite && (
					<div className="absolute top-3 left-3 bg-white px-3 py-1 rounded-full shadow-md">
						<span className="text-xs font-semibold text-gray-900">
							Guest favorite
						</span>
					</div>
				)}
			</div>

			<div className="space-y-1">
				<div className="flex items-center justify-between">
					<h3 className="font-semibold text-[15px] text-gray-900 truncate flex-1">
						{trip.title}
					</h3>
					<div className="flex items-center gap-1 ml-2 flex-shrink-0">
						<Star size={12} className="fill-gray-900" />
						<span className="text-sm font-medium text-gray-900">
							{trip.rating.toFixed(2)}
						</span>
					</div>
				</div>

				<p className="text-sm text-gray-600">{trip.location}</p>

				<p className="text-sm text-gray-600">{trip.duration}</p>

				<div className="pt-1">
					<span className="text-[15px] font-semibold text-gray-900">
						${trip.price.toLocaleString()}
					</span>
					<span className="text-sm text-gray-600"> total</span>
				</div>
			</div>
		</div>
	);
}

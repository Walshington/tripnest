import { Search } from "lucide-react";
import { useState } from "react";
import {
	type Destination,
	suggestedDestinations,
	suggestedOrigins,
} from "@/data/mockTrips";
import DateRangePicker from "./DateRangePicker";
import GuestSelector from "./GuestSelector";
import LocationInput from "./LocationInput";

interface GuestCounts {
	adults: number;
	children: number;
	infants: number;
	pets: number;
}

export default function SearchBar() {
	const [fromLocation, setFromLocation] = useState("");
	const [toLocation, setToLocation] = useState("");
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);
	const [guests, setGuests] = useState<GuestCounts>({
		adults: 1,
		children: 0,
		infants: 0,
		pets: 0,
	});

	const handleFromSelect = (destination: Destination) => {
		console.log("From selected:", destination);
	};

	const handleToSelect = (destination: Destination) => {
		console.log("To selected:", destination);
	};

	const handleSearch = () => {
		console.log("Search:", {
			fromLocation,
			toLocation,
			startDate,
			endDate,
			guests,
		});
	};

	return (
		<div className="w-full max-w-6xl mx-auto px-4">
			<div className="bg-white rounded-full shadow-xl border border-gray-200 p-2">
				<div className="flex items-center gap-0">
					{/* From Location */}
					<div className="flex-1 px-6 py-3 border-r border-gray-200 hover:bg-gray-50 rounded-full transition-colors">
						<LocationInput
							label="From"
							placeholder="Search origins"
							value={fromLocation}
							onChange={setFromLocation}
							suggestions={suggestedOrigins}
							onSelect={handleFromSelect}
						/>
					</div>

					{/* To Location */}
					<div className="flex-1 px-6 py-3 border-r border-gray-200 hover:bg-gray-50 rounded-full transition-colors">
						<LocationInput
							label="To"
							placeholder="Search destinations"
							value={toLocation}
							onChange={setToLocation}
							suggestions={suggestedDestinations}
							onSelect={handleToSelect}
						/>
					</div>

					{/* Date Range */}
					<div className="flex-1 px-6 py-3 border-r border-gray-200 hover:bg-gray-50 rounded-full transition-colors">
						<DateRangePicker
							startDate={startDate}
							endDate={endDate}
							onStartDateChange={setStartDate}
							onEndDateChange={setEndDate}
						/>
					</div>

					{/* Guest Selector */}
					<div className="flex-1 px-6 py-3 hover:bg-gray-50 rounded-full transition-colors">
						<GuestSelector guests={guests} onChange={setGuests} />
					</div>

					{/* Search Button */}
					<button
						type="button"
						onClick={handleSearch}
						className="bg-[#FF385C] hover:bg-[#E31C5F] text-white p-4 rounded-full transition-colors ml-2 flex items-center justify-center"
						aria-label="Search"
					>
						<Search size={20} />
					</button>
				</div>
			</div>
		</div>
	);
}

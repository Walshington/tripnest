import { createFileRoute } from "@tanstack/react-router";
import SearchBar from "@/components/SearchBar";
import TripSection from "@/components/TripSection";
import {
	adventureTrips,
	beachDestinations,
	popularTripsFromTampa,
	trendingDestinations,
} from "@/data/mockTrips";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	return (
		<div className="min-h-screen bg-white">
			{/* Hero Section with Search Bar */}
			<section className="pt-20 pb-12 bg-linear-to-b from-gray-50 to-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12">
						<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
							Plan your perfect trip
						</h1>
						<p className="text-lg text-gray-600">
							Discover amazing destinations and create unforgettable memories
						</p>
					</div>
					<SearchBar />
				</div>
			</section>

			{/* Trip Sections */}
			<div className="bg-white">
				<TripSection
					title="Popular trips from Tampa"
					subtitle="Destinations our guests love, close to home"
					trips={popularTripsFromTampa}
				/>

				<TripSection
					title="Trending destinations this month"
					subtitle="Experience the world's most sought-after locations"
					trips={trendingDestinations}
				/>

				<TripSection
					title="Beach destinations for families"
					subtitle="Sun, sand, and unforgettable family moments"
					trips={beachDestinations}
				/>

				<TripSection
					title="Adventure trips"
					subtitle="For those who seek thrills and natural wonders"
					trips={adventureTrips}
				/>
			</div>

			{/* Footer Spacing */}
			<div className="h-16" />
		</div>
	);
}

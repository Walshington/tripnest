export interface Trip {
	id: string;
	title: string;
	location: string;
	imageUrl: string;
	price: number;
	duration: string;
	rating: number;
	reviewCount: number;
	isFavorite?: boolean;
	isGuestFavorite?: boolean;
	category: string;
}

export interface Destination {
	id: string;
	city: string;
	state?: string;
	country?: string;
	description: string;
	icon: "nearby" | "beach" | "city" | "theme-park" | "culture" | "adventure";
}

export const suggestedOrigins: Destination[] = [
	{
		id: "nearby",
		city: "Nearby",
		description: "Find what's around you",
		icon: "nearby",
	},
	{
		id: "tampa",
		city: "Tampa",
		state: "FL",
		description: "Your current location",
		icon: "city",
	},
	{
		id: "miami",
		city: "Miami",
		state: "FL",
		description: "Major Florida hub",
		icon: "city",
	},
	{
		id: "orlando",
		city: "Orlando",
		state: "FL",
		description: "Theme park capital",
		icon: "theme-park",
	},
];

export const suggestedDestinations: Destination[] = [
	{
		id: "nearby",
		city: "Nearby",
		description: "Find what's around you",
		icon: "nearby",
	},
	{
		id: "tampa-dest",
		city: "Tampa",
		state: "FL",
		description: "Popular beach destination",
		icon: "beach",
	},
	{
		id: "miami-dest",
		city: "Miami",
		state: "FL",
		description: "For sights like Bayside Marketplace",
		icon: "city",
	},
	{
		id: "kissimmee",
		city: "Kissimmee",
		state: "FL",
		description: "Near you",
		icon: "theme-park",
	},
	{
		id: "st-augustine",
		city: "St. Augustine",
		state: "FL",
		description: "Great for a weekend getaway",
		icon: "culture",
	},
	{
		id: "san-juan",
		city: "San Juan",
		country: "Puerto Rico",
		description: "Popular beach destination",
		icon: "beach",
	},
	{
		id: "daytona",
		city: "Daytona Beach",
		state: "FL",
		description: "Great for a weekend getaway",
		icon: "beach",
	},
];

export const popularTripsFromTampa: Trip[] = [
	{
		id: "trip-1",
		title: "Miami Beach Getaway",
		location: "Miami, FL",
		imageUrl:
			"https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=800&h=600&fit=crop",
		price: 450,
		duration: "3 nights",
		rating: 4.92,
		reviewCount: 248,
		isGuestFavorite: true,
		category: "full-package",
	},
	{
		id: "trip-2",
		title: "Orlando Theme Parks Adventure",
		location: "Orlando, FL",
		imageUrl:
			"https://images.unsplash.com/photo-1566738780863-f9608f88f3a9?w=800&h=600&fit=crop",
		price: 680,
		duration: "4 nights",
		rating: 4.88,
		reviewCount: 392,
		isGuestFavorite: true,
		category: "full-package",
	},
	{
		id: "trip-3",
		title: "Key West Island Escape",
		location: "Key West, FL",
		imageUrl:
			"https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
		price: 520,
		duration: "2 nights",
		rating: 4.95,
		reviewCount: 167,
		category: "hotel",
	},
	{
		id: "trip-4",
		title: "Tampa Bay Exploration",
		location: "Tampa, FL",
		imageUrl:
			"https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop",
		price: 380,
		duration: "3 nights",
		rating: 4.86,
		reviewCount: 203,
		category: "excursion",
	},
	{
		id: "trip-5",
		title: "Fort Lauderdale Beach Resort",
		location: "Fort Lauderdale, FL",
		imageUrl:
			"https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800&h=600&fit=crop",
		price: 495,
		duration: "3 nights",
		rating: 4.91,
		reviewCount: 312,
		isGuestFavorite: true,
		category: "hotel",
	},
	{
		id: "trip-6",
		title: "Clearwater Beach Retreat",
		location: "Clearwater, FL",
		imageUrl:
			"https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop",
		price: 425,
		duration: "2 nights",
		rating: 4.89,
		reviewCount: 178,
		category: "hotel",
	},
];

export const trendingDestinations: Trip[] = [
	{
		id: "trend-1",
		title: "Paris Romance Package",
		location: "Paris, France",
		imageUrl:
			"https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop",
		price: 1200,
		duration: "5 nights",
		rating: 4.96,
		reviewCount: 542,
		isGuestFavorite: true,
		category: "full-package",
	},
	{
		id: "trend-2",
		title: "Tokyo Experience",
		location: "Tokyo, Japan",
		imageUrl:
			"https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop",
		price: 1800,
		duration: "7 nights",
		rating: 4.94,
		reviewCount: 623,
		isGuestFavorite: true,
		category: "full-package",
	},
	{
		id: "trend-3",
		title: "Barcelona Culture Trip",
		location: "Barcelona, Spain",
		imageUrl:
			"https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&h=600&fit=crop",
		price: 950,
		duration: "4 nights",
		rating: 4.93,
		reviewCount: 478,
		category: "full-package",
	},
	{
		id: "trend-4",
		title: "Dubai Luxury Escape",
		location: "Dubai, UAE",
		imageUrl:
			"https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop",
		price: 2100,
		duration: "6 nights",
		rating: 4.97,
		reviewCount: 721,
		isGuestFavorite: true,
		category: "full-package",
	},
	{
		id: "trend-5",
		title: "Santorini Dreams",
		location: "Santorini, Greece",
		imageUrl:
			"https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&h=600&fit=crop",
		price: 1350,
		duration: "5 nights",
		rating: 4.98,
		reviewCount: 892,
		isGuestFavorite: true,
		category: "hotel",
	},
	{
		id: "trend-6",
		title: "London City Break",
		location: "London, UK",
		imageUrl:
			"https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop",
		price: 1100,
		duration: "4 nights",
		rating: 4.91,
		reviewCount: 534,
		category: "full-package",
	},
];

export const beachDestinations: Trip[] = [
	{
		id: "beach-1",
		title: "Cancun All-Inclusive",
		location: "Cancun, Mexico",
		imageUrl:
			"https://images.unsplash.com/photo-1568402102990-bc541580b59f?w=800&h=600&fit=crop",
		price: 890,
		duration: "5 nights",
		rating: 4.89,
		reviewCount: 445,
		isGuestFavorite: true,
		category: "hotel",
	},
	{
		id: "beach-2",
		title: "Maui Family Resort",
		location: "Maui, Hawaii",
		imageUrl:
			"https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
		price: 1400,
		duration: "6 nights",
		rating: 4.95,
		reviewCount: 612,
		isGuestFavorite: true,
		category: "hotel",
	},
	{
		id: "beach-3",
		title: "Bahamas Paradise",
		location: "Nassau, Bahamas",
		imageUrl:
			"https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800&h=600&fit=crop",
		price: 720,
		duration: "4 nights",
		rating: 4.87,
		reviewCount: 328,
		category: "full-package",
	},
	{
		id: "beach-4",
		title: "Punta Cana Resort",
		location: "Punta Cana, Dominican Republic",
		imageUrl:
			"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
		price: 650,
		duration: "4 nights",
		rating: 4.84,
		reviewCount: 267,
		isGuestFavorite: true,
		category: "hotel",
	},
	{
		id: "beach-5",
		title: "Maldives Overwater Villa",
		location: "Maldives",
		imageUrl:
			"https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&h=600&fit=crop",
		price: 2800,
		duration: "7 nights",
		rating: 4.99,
		reviewCount: 923,
		isGuestFavorite: true,
		category: "hotel",
	},
	{
		id: "beach-6",
		title: "Aruba Beach Escape",
		location: "Aruba",
		imageUrl:
			"https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800&h=600&fit=crop",
		price: 775,
		duration: "5 nights",
		rating: 4.92,
		reviewCount: 401,
		category: "hotel",
	},
];

export const adventureTrips: Trip[] = [
	{
		id: "adventure-1",
		title: "Costa Rica Jungle & Beach",
		location: "Costa Rica",
		imageUrl:
			"https://images.unsplash.com/photo-1516652423021-089001d4daf0?w=800&h=600&fit=crop",
		price: 1100,
		duration: "7 nights",
		rating: 4.93,
		reviewCount: 512,
		isGuestFavorite: true,
		category: "full-package",
	},
	{
		id: "adventure-2",
		title: "Iceland Northern Lights",
		location: "Reykjavik, Iceland",
		imageUrl:
			"https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800&h=600&fit=crop",
		price: 1600,
		duration: "5 nights",
		rating: 4.96,
		reviewCount: 634,
		isGuestFavorite: true,
		category: "full-package",
	},
	{
		id: "adventure-3",
		title: "New Zealand Nature Tour",
		location: "Queenstown, New Zealand",
		imageUrl:
			"https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&h=600&fit=crop",
		price: 2400,
		duration: "10 nights",
		rating: 4.98,
		reviewCount: 789,
		isGuestFavorite: true,
		category: "full-package",
	},
	{
		id: "adventure-4",
		title: "Swiss Alps Adventure",
		location: "Interlaken, Switzerland",
		imageUrl:
			"https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&h=600&fit=crop",
		price: 1800,
		duration: "6 nights",
		rating: 4.94,
		reviewCount: 567,
		category: "full-package",
	},
	{
		id: "adventure-5",
		title: "Patagonia Expedition",
		location: "Patagonia, Chile",
		imageUrl:
			"https://images.unsplash.com/photo-1569098644584-210bcd375b59?w=800&h=600&fit=crop",
		price: 2200,
		duration: "8 nights",
		rating: 4.97,
		reviewCount: 456,
		isGuestFavorite: true,
		category: "full-package",
	},
	{
		id: "adventure-6",
		title: "Safari in Tanzania",
		location: "Serengeti, Tanzania",
		imageUrl:
			"https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=600&fit=crop",
		price: 3200,
		duration: "9 nights",
		rating: 4.99,
		reviewCount: 712,
		isGuestFavorite: true,
		category: "excursion",
	},
];

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface DateRangePickerProps {
	startDate: Date | null;
	endDate: Date | null;
	onStartDateChange: (date: Date | null) => void;
	onEndDateChange: (date: Date | null) => void;
}

export default function DateRangePicker({
	startDate,
	endDate,
	onStartDateChange,
	onEndDateChange,
}: DateRangePickerProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [currentMonth, setCurrentMonth] = useState(new Date());
	const [selectingStart, setSelectingStart] = useState(true);
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

	const formatDateRange = () => {
		if (startDate && endDate) {
			return `${formatDate(startDate)} - ${formatDate(endDate)}`;
		}
		if (startDate) {
			return `${formatDate(startDate)} - Add date`;
		}
		return "Add dates";
	};

	const formatDate = (date: Date) => {
		return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
	};

	const getDaysInMonth = (date: Date) => {
		const year = date.getFullYear();
		const month = date.getMonth();
		const firstDay = new Date(year, month, 1);
		const lastDay = new Date(year, month + 1, 0);
		const daysInMonth = lastDay.getDate();
		const startingDayOfWeek = firstDay.getDay();

		return { daysInMonth, startingDayOfWeek, year, month };
	};

	const handleDateClick = (day: number, month: number, year: number) => {
		const selectedDate = new Date(year, month, day);

		if (selectingStart || !startDate) {
			onStartDateChange(selectedDate);
			onEndDateChange(null);
			setSelectingStart(false);
		} else {
			if (selectedDate < startDate) {
				onStartDateChange(selectedDate);
				onEndDateChange(null);
				setSelectingStart(false);
			} else {
				onEndDateChange(selectedDate);
				setSelectingStart(true);
			}
		}
	};

	const isDateInRange = (day: number, month: number, year: number) => {
		if (!startDate || !endDate) return false;
		const date = new Date(year, month, day);
		return date > startDate && date < endDate;
	};

	const isDateSelected = (day: number, month: number, year: number) => {
		const date = new Date(year, month, day);
		if (startDate && isSameDay(date, startDate)) return true;
		if (endDate && isSameDay(date, endDate)) return true;
		return false;
	};

	const isSameDay = (date1: Date, date2: Date) => {
		return (
			date1.getFullYear() === date2.getFullYear() &&
			date1.getMonth() === date2.getMonth() &&
			date1.getDate() === date2.getDate()
		);
	};

	const isDateDisabled = (day: number, month: number, year: number) => {
		const date = new Date(year, month, day);
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		return date < today;
	};

	const nextMonth = () => {
		setCurrentMonth(
			new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1),
		);
	};

	const prevMonth = () => {
		setCurrentMonth(
			new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1),
		);
	};

	const renderCalendar = (monthOffset: number) => {
		const displayMonth = new Date(
			currentMonth.getFullYear(),
			currentMonth.getMonth() + monthOffset,
		);
		const { daysInMonth, startingDayOfWeek, year, month } =
			getDaysInMonth(displayMonth);

		const monthName = displayMonth.toLocaleDateString("en-US", {
			month: "long",
			year: "numeric",
		});

		const days = [];
		const totalSlots = Math.ceil((daysInMonth + startingDayOfWeek) / 7) * 7;

		for (let i = 0; i < totalSlots; i++) {
			const day = i - startingDayOfWeek + 1;
			const isValidDay = day > 0 && day <= daysInMonth;
			const disabled = isValidDay && isDateDisabled(day, month, year);
			const selected = isValidDay && isDateSelected(day, month, year);
			const inRange = isValidDay && isDateInRange(day, month, year);

			days.push(
				<button
					key={i}
					type="button"
					disabled={!isValidDay || disabled}
					onClick={() => isValidDay && handleDateClick(day, month, year)}
					className={`
						aspect-square flex items-center justify-center text-sm rounded-full
						${!isValidDay ? "invisible" : ""}
						${disabled ? "text-gray-300 cursor-not-allowed" : "text-gray-800 hover:bg-gray-100"}
						${selected ? "bg-gray-900 text-white hover:bg-gray-900" : ""}
						${inRange ? "bg-gray-100" : ""}
					`}
				>
					{isValidDay ? day : ""}
				</button>,
			);
		}

		return (
			<div className="flex-1 px-2">
				<div className="text-center font-semibold text-sm mb-4">
					{monthName}
				</div>
				<div className="grid grid-cols-7 gap-1 mb-2">
					{["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
						<div
							key={day}
							className="text-xs text-gray-500 font-medium text-center"
						>
							{day}
						</div>
					))}
				</div>
				<div className="grid grid-cols-7 gap-1">{days}</div>
			</div>
		);
	};

	return (
		<div ref={containerRef} className="relative flex-1">
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				className="flex flex-col text-left w-full"
			>
				<span className="text-xs font-semibold text-gray-800 mb-1">When</span>
				<span className="text-sm text-gray-800">{formatDateRange()}</span>
			</button>

			{isOpen && (
				<div className="absolute top-full left-0 mt-2 bg-white rounded-3xl shadow-xl border border-gray-200 p-6 z-50">
					<div className="flex items-center justify-between mb-6">
						<button
							type="button"
							onClick={prevMonth}
							className="p-2 hover:bg-gray-100 rounded-full transition-colors"
						>
							<ChevronLeft size={20} />
						</button>
						<button
							type="button"
							onClick={nextMonth}
							className="p-2 hover:bg-gray-100 rounded-full transition-colors"
						>
							<ChevronRight size={20} />
						</button>
					</div>

					<div className="flex gap-8">
						{renderCalendar(0)}
						{renderCalendar(1)}
					</div>

					<div className="mt-6 pt-6 border-t border-gray-200 flex justify-between items-center">
						<button
							type="button"
							onClick={() => {
								onStartDateChange(null);
								onEndDateChange(null);
								setSelectingStart(true);
							}}
							className="text-sm font-semibold text-gray-800 underline hover:text-gray-600"
						>
							Clear dates
						</button>
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

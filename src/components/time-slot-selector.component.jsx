'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

const TimeSlotSelector = ({
	selectedDate,
	formData,
	setFormData,
	setErrors,
}) => {
	const [availableSlots, setAvailableSlots] = useState([]);
	const [selectedTime, setSelectedTime] = useState('');

	useEffect(() => {
		if (selectedDate) {
			axios
				.get(`${process.env.NEXT_PUBLIC_API_URL}/available-times`, {
					params: { date: selectedDate },
				})
				.then((response) => {
					setAvailableSlots(response.data.availableSlots || []);
				})
				.catch((error) => {
					console.error('Error fetching available slots:', error);
				});
		}
	}, [selectedDate]);

	const handleTimeChange = (e) => {
		setSelectedTime(e.target.value);
		setFormData((prevData) => ({
			...prevData,
			time: selectedTime,
		}));
		setErrors((prevErrors) => ({
			...prevErrors,
			time: '',
		}));
	};

	return (
		<select
			id="time"
			name="time"
			value={formData.time || ''}
			onChange={handleTimeChange}
			className="w-full p-2 px-4 bg-gray-200 rounded-md focus:outline-none focus:border-none text-gray-600"
		>
			<option value="">Select Time</option>
			{availableSlots.map((slot) => (
				<option key={slot} value={slot}>
					{slot}
				</option>
			))}
		</select>
	);
};

export default TimeSlotSelector;

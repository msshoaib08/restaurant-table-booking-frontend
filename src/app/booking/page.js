'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import qs from 'qs';
import InputField from '@/components/input-field.component';
import Button from '@/components/button.component';
import Link from 'next/link';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import TimeSlotSelector from '@/components/time-slot-selector.component';

const BookingPage = () => {
	const router = useRouter();

	const [formData, setFormData] = useState({
		name: '',
		contact: '',
		date: '',
		time: '',
		guests: 1,
	});

	const [errors, setErrors] = useState({
		name: '',
		contact: '',
		date: '',
		time: '',
		guests: '',
	});

	const [apiResponse, setApiResponse] = useState(null);

	const checkTimeAvailability = async (date, time) => {
		try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/available-times`,
				{ params: { date } }
			);

			const availableSlots = response.data.availableSlots || [];

			return availableSlots.includes(time);
		} catch (error) {
			console.error('Error checking time availability:', error);
			return false;
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;

		if (name === 'contact') {
			if (/^\d*$/.test(value)) {
				setFormData({
					...formData,
					[name]: value,
				});
			}
		} else {
			setFormData({
				...formData,
				[name]: value,
			});
		}

		if (errors[name]) {
			setErrors((prevErrors) => ({
				...prevErrors,
				[name]: '',
			}));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const newErrors = {};

		if (!formData.name) newErrors.name = 'Name is required';
		if (!formData.contact) {
			newErrors.contact = 'Contact is required';
		} else if (!/^\d{10}$/.test(formData.contact)) {
			newErrors.contact = 'Contact must be a 10-digit number';
		}
		if (!formData.date) newErrors.date = 'Date is required';

		if (!formData.time) {
			newErrors.time = 'Time is required';
		} else {
			const isAvailable = await checkTimeAvailability(
				formData.date,
				formData.time
			);
			if (!isAvailable) {
				newErrors.time = 'This time slot is already taken.';
			}
		}

		if (formData.guests <= 0) {
			newErrors.guests = 'Guests number must be greater than 0';
		}

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		try {
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/bookings`,
				formData
			);

			setApiResponse(response.data);
			toast.success('Table is Booked Successfully');
			setFormData({
				name: '',
				contact: '',
				date: '',
				time: '',
				guests: 1,
			});

			const queryString = qs.stringify(formData);

			router.push(`/success-booking?${queryString}`);
		} catch (err) {
			if (err.response && err.response.status === 400) {
				const errorMessage = err.response.data.message;
				if (errorMessage === 'Time slot already taken') {
					toast.error(errorMessage);
				} else {
					toast.error('Failed to Book Table. Please try again later.');
				}
			} else {
				console.error('Unexpected error during booking:', err);
				toast.error('Failed to Book Table. Please try again later.');
			}
		}
	};

	return (
		<section className="bg-gray-900 text-white min-h-screen">
			<Toaster />
			<div className="max-w-7xl w-full px-5 sm:px-10">
				<h1 className="text-3xl sm:text-4xl font-bold mb-6">Book Your Table</h1>

				<form className="space-y-6 max-w-xl mx-auto" onSubmit={handleSubmit}>
					<div className="mb-4">
						<InputField
							type="text"
							id="name"
							name="name"
							placeholder="Full Name"
							value={formData.name}
							onChange={handleChange}
						/>
						{errors.name && (
							<p className="text-red-500 text-sm">{errors.name}</p>
						)}
					</div>

					<div className="mb-4">
						<InputField
							type="tel"
							id="contact"
							name="contact"
							placeholder="Your Contact Number"
							value={formData.contact}
							onChange={handleChange}
						/>
						{errors.contact && (
							<p className="text-red-500 text-sm">{errors.contact}</p>
						)}
					</div>

					<div className="mb-4">
						<InputField
							type="date"
							id="date"
							name="date"
							placeholder=""
							value={formData.date}
							onChange={handleChange}
						/>
						{errors.date && (
							<p className="text-red-500 text-sm">{errors.date}</p>
						)}
					</div>

					<div className="mb-4">
						<TimeSlotSelector
							selectedDate={formData.date}
							formData={formData}
							setFormData={setFormData}
							setErrors={setErrors}
						/>
						{errors.time && (
							<p className="text-red-500 text-sm">{errors.time}</p>
						)}
					</div>

					<div className="mb-4">
						<InputField
							type="number"
							id="guests"
							name="guests"
							placeholder="Number of Guests"
							value={formData.guests}
							onChange={(e) => {
								const value = parseInt(e.target.value, 10);
								if (value >= 0 || e.target.value === '') {
									handleChange(e);
								}
							}}
							min="1"
						/>
						{errors.guests && (
							<p className="text-red-500 text-sm">{errors.guests}</p>
						)}
					</div>

					<div className="space-x-4">
						<Button type="submit" label="Book Now" />
						<Link href="/">Go Back</Link>
					</div>
				</form>
			</div>
		</section>
	);
};

export default BookingPage;

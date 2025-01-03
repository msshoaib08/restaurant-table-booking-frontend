'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';

const BookingDetails = () => {
	const searchParams = useSearchParams();

	const name = searchParams.get('name');
	const contact = searchParams.get('contact');
	const date = searchParams.get('date');
	const time = searchParams.get('time');
	const guests = searchParams.get('guests');

	return (
		<section className="bg-gray-900 text-white min-h-screen">
			<div className="max-w-xl w-full px-5 sm:px-10">
				<h1 className="text-3xl sm:text-4xl font-bold mb-6">
					Booking Successful!
				</h1>

				<div className="w-full h-[1px] bg-gray-500 mb-6"></div>
				<div className="text-start">
					<h2 className="text-xl font-semibold">Booking Details:</h2>
					<ul className="space-y-2 mt-4">
						<li>
							<strong>Customer Name: </strong>
							{name}
						</li>
						<li>
							<strong>Contact Number: </strong>
							{contact}
						</li>
						<li>
							<strong>Booking Date: </strong>
							{date}
						</li>
						<li>
							<strong>Booking Slot Time: </strong>
							{time}
						</li>
						<li>
							<strong>Number of Guests: </strong>
							{guests}
						</li>
					</ul>
				</div>

				<div className="w-full h-[1px] bg-gray-500 my-6 mb-10"></div>
				<Link
					href="/"
					className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700"
				>
					Go back to Home Page
				</Link>
			</div>
		</section>
	);
};

const BookingSuccessful = () => {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<BookingDetails />
		</Suspense>
	);
};

export default BookingSuccessful;

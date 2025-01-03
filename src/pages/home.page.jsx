import Link from 'next/link';

const HomePage = () => {
	return (
		<section className="min-h-screen bg-gray-900 text-white">
			<div className="max-w-7xl w-full px-5 sm:px-10">
				<h1 className="text-3xl sm:text-4xl font-bold mb-4">
					Welcome to Our Restaurant
				</h1>
				<p className="text-lg sm:text-xl mb-8">
					Indulge in a memorable dining experience with flavors that delight.
					Book a table and enjoy our special cuisine.
				</p>

				<Link href="/booking">
					<button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700">
						Book a Table
					</button>
				</Link>
			</div>
		</section>
	);
};

export default HomePage;

const Button = ({ label, type }) => {
	return (
		<button
			type={type}
			className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700"
		>
			{label}
		</button>
	);
};

export default Button;

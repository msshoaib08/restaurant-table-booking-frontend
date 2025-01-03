const InputField = ({
	type,
	id,
	name,
	value,
	onChange,
	placeholder,
	...rest
}) => {
	return (
		<input
			type={type}
			id={id}
			name={name}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			{...rest}
			className="w-full p-2 px-4 bg-gray-200 rounded-md focus:outline-none focus:border-none text-gray-600"
		/>
	);
};

export default InputField;

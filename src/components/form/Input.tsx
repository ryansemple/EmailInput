import React, { ChangeEvent } from "react";
import clsx from "clsx";

interface InputProps {
	className: string,
	value: string,
	onChange: (value: string) => void,
	name: string
}

const Input = (props: InputProps) => 
{
	const { className, value, onChange, name } = props;
	
	const onChangeEvent = (event: ChangeEvent<HTMLInputElement>): void =>
	{
		const value: string = event.currentTarget.value;
		onChange(value);
	}

	return (
		<input 
			className={clsx("form_input", className)}
			value={value}
			onChange={onChangeEvent}
			name={name}
		/>
	)
}

export default Input;
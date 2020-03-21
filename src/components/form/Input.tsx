import React, { ChangeEvent } from "react";

interface IInputProps {
	className: string,
	value: string,
	onChange: (value: string) => void
}

const Input = (props: IInputProps) => 
{
	const onChange = (event: ChangeEvent<HTMLInputElement>): void => 
	{
		const value: string = event.currentTarget.value;
		props.onChange(value);
	}

	return (
		<input 
			className={`form_input ${props.className}`}
			value={props.value}
			onChange={onChange}
		/>
	)
}

export default Input;
import React, { ChangeEvent } from "react";
import clsx from "clsx";

interface InputProps {
	className: string,
	value: string,
	onChange: (value: string) => void,
	name: string
}

/**
 * Renders an input element.
 */
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
			className={clsx("Input", className)}
			value={value}
			onChange={onChangeEvent}
			name={name}
		/>
	)
}

export default Input;
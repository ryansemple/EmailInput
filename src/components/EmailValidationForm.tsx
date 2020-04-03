import React from "react";
import Label from "./form/Label";
import Input from "./form/Input";
import { atCharacter, xCharacter } from "../utility/String";
import Button from "./form/Button";
import EmailSuggestions from "./suggestions/EmailSuggestions";
import ValidationMessage from "./ValidationMessage";
import { ValidationType } from "../types/ValidationType";
import clsx from "clsx";
import { emailAppearsToBeValid } from "../utility/Language";
import Validator from "../types/Validator";
import { 
	doesEmailHavePeriod,
	emailHasNothingAfterAtCharacter,
	doesEmailHaveExtension,
	doesEmailHaveInvalidCharacters,
	isFirstCharacterOfEmailValid,
	emailDomainStartsWithAPeriod
} from "../utility/Email";

/**
 * The collection of validators that will each be ran. if the 
 * predicateMeansFailIfTrue function fails then that error will
 * be shown to the user and no further validators will be ran.
 * The order of this collection matters, the validators will be 
 * ran from top to bottom.
 */
const validators: Validator[] =
[
	{ 
		predicateMeansFailIfTrue: doesEmailHaveInvalidCharacters,
		errorMessageIfFailed: "Email is not valid, it contains invalid characters."
	},
	{
		predicateMeansFailIfTrue: (email: string) => !isFirstCharacterOfEmailValid(email),
		errorMessageIfFailed: `First character of email is not valid, it should be alphanumeric`
	},
	{
		predicateMeansFailIfTrue: (email: string) => !email.includes(atCharacter),
		errorMessageIfFailed: `Email doesn't contain an '${atCharacter}' character`
	},
	{
		predicateMeansFailIfTrue: (email: string) => email.split(atCharacter).length === 3,
		errorMessageIfFailed: `Email can only contain one '${atCharacter}' character`
	},
	{
		predicateMeansFailIfTrue: emailHasNothingAfterAtCharacter,
		errorMessageIfFailed: `Email doesn't contain a domain name (name after the '${atCharacter}' character)`
	},
	{
		predicateMeansFailIfTrue: emailDomainStartsWithAPeriod,
		errorMessageIfFailed: `Email domain can not begin with a period`
	},
	{
		predicateMeansFailIfTrue: (email: string) => !doesEmailHavePeriod(email),
		errorMessageIfFailed: `Email doesn't have a period`
	},
	{
		predicateMeansFailIfTrue: (email: string) => !doesEmailHaveExtension(email),
		errorMessageIfFailed: `Email doesn't have an extension (eg: com, ca)`
	}
];

interface EmailValidationFormProps {
	setEmail: (email: string) => void,
	setEmailValidationMessage: (emailValidationMessage: string) => void,
	email: string,
	setEmailIsValid: (emailIsValid: boolean) => void,
	emailIsValid: boolean,
	emailValidationMessage?: string,
	className?: string,
	resetEmail: () => void
}

/**
 * Renders the form elements for the email validation form and
 * also the email suggestinos and validation message below the
 * form elements.
 */
const EmailValidationForm = (props: EmailValidationFormProps) => 
{
	const { 
		setEmail, 
		setEmailIsValid, 
		setEmailValidationMessage, 
		resetEmail, 
		email,
		emailValidationMessage,
		emailIsValid,
		className
	} = props;
	
	/**
	 * sets the email validation message depending on the email
	 * entered by the user.
	 * 
	 * @param email - the email entered by the user.
	 */
	const handleSettingEmailValidationMessage = (email: string): void => 
	{
		for (let i: number = 0; i < validators.length; i++)
		{
			const validator: Validator = validators[i];

			const validationFailed: boolean = validator
				.predicateMeansFailIfTrue(email);

			if (validationFailed)
			{
				setEmailIsValid(false);
				setEmailValidationMessage(validator.errorMessageIfFailed);
				return;
			}
		}

		//email passed all validation tests
		setEmailIsValid(true);
		setEmailValidationMessage(emailAppearsToBeValid);
	}
	
	/**
	 * handles setting the email state property when the user
	 * has typed in the email input and calls the function
	 * that sets the email validation message.
	 * 
	 * @param email - the user entered email.
	 */
	const emailInputOnChange = (email: string): void => 
	{		
		setEmail(email);

		if (email)
		{
			handleSettingEmailValidationMessage(email);
		} 
		else 
		{
			setEmailIsValid(false);
			setEmailValidationMessage("");
		}	
	}
	
	const inputName: string = "EmailInput";
	const validationType: ValidationType = emailIsValid ?
	ValidationType.Success :
	ValidationType.Error;

	return (
		<div className={clsx("EmailValidationForm", className)}>
			<Label
				className="block"
				text="Enter Email:"
				htmlFor={inputName}
			/>
			<div className="relative">
				<Input
					className="block full_width"
					onChange={emailInputOnChange}
					value={email}
					name={inputName}
				/>
				<Button 
					onClick={() => { resetEmail() }}
					text={xCharacter}
					className="Button-Clear absolute"
					notDisabledTooltipTitle="Clear text input"
					style={{
						top: 0,
						bottom: 0,
						right: 0,
						borderTopLeftRadius: 0,
						borderBottomLeftRadius: 0
					}}
				/>
			</div>
			<EmailSuggestions
				email={email}
				setEmail={(email: string) => setEmail(email)}
				setEmailIsValid={(emailIsValid: boolean) => setEmailIsValid(emailIsValid)}
				setEmailValidationMessage={
					(emailValidationMessage: string) => setEmailValidationMessage(emailValidationMessage)
				}
			/>
			<ValidationMessage
				validationMessage={emailValidationMessage}
				validationType={validationType}
			/>
		</div>
	)
}

export default EmailValidationForm;
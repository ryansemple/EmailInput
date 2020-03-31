import React from "react";
import Label from "./form/Label";
import Input from "./form/Input";
import { allKeyboardKeysRegex } from "../utility/Regex";
import { atCharacter } from "../utility/String";
import Button from "./form/Button";
import EmailSuggestions from "./suggestions/Suggestions";
import ValidationMessage from "./ValidationMessage";
import { ValidationType } from "../types/Validation";
import clsx from "clsx";

interface EmailValidationForm {
	setEmail: (email: string) => void,
	setEmailMessage: (emailMessage: string) => void,
	email: string,
	setEmailIsValid: (emailIsValid: boolean) => void,
	emailIsValid: boolean,
	emailMessage?: string,
	className?: string,
	resetEmail: () => void
}

interface Validator {
	validationFunctionToPass: (email: string) => boolean
	errorMessageIfFailed: string;
}

const doesEmailHaveDomain = (email : string): boolean =>
{
	return email.split(atCharacter)[1].includes(".");
}

const isDomainInEmail = (email : string) : boolean =>
{
	const emailSplitOnAtCharacter : string[] = email.split(atCharacter);
	return emailSplitOnAtCharacter.length >= 2;
}

const validationRules: Validator[] = 
[
	{
		validationFunctionToPass: (email: string) => allKeyboardKeysRegex.test(email),
		errorMessageIfFailed: "Beginning part of email is not valid. only characters a-z, A-Z, 0-1 and !#$%&'*+-/=?^_`{|}~ are allowed."
	},
	{
		validationFunctionToPass: (email: string) => email.includes(atCharacter),
		errorMessageIfFailed: `Email doesn't contain an '${atCharacter}' symbol`
	},
	{
		validationFunctionToPass: (email: string) => doesEmailHaveDomain(email),
		errorMessageIfFailed: `Email doesn't contain a domain name (name after the '${atCharacter}' symbol)`
	},
	{
		validationFunctionToPass: (email: string) => email.split(atCharacter).length === 2,
		errorMessageIfFailed: `Email can only contain one '${atCharacter}' symbol`
	},
	{
		validationFunctionToPass: (email: string) => isDomainInEmail(email),
		errorMessageIfFailed: "Email doesn't contain a domain"
	}
];

const EmailValidationForm = (props: EmailValidationForm) => 
{
	const { setEmail, setEmailIsValid, setEmailMessage, resetEmail } = props;
	
	const handleSettingEmailMessage = (email: string) => 
	{
		for (let i: number = 0; i < validationRules.length; i++)
		{
			const validationRule: Validator = validationRules[i];

			const validationRulePassed: boolean = validationRule
				.validationFunctionToPass(email);

			if (!validationRulePassed)
			{
				setEmailIsValid(false);
				setEmailMessage(validationRule.errorMessageIfFailed);
				return;
			}
		}

		//email passed all validation tests
		setEmailIsValid(true);
		setEmailMessage("Email appears to be valid");
	}
	
	const emailChanged = (email: string): void => 
	{		
		setEmail(email);

		if (email)
		{
			handleSettingEmailMessage(email);
		} 
		else 
		{
			setEmailIsValid(false);
			setEmailMessage("");
		}	
	}
	
	const inputName: string = "EmailValidator";
	const validationType: ValidationType = props.emailIsValid ?
	ValidationType.Success :
	ValidationType.Error;

	return (
		<div className={clsx("EmailValidationForm", props.className)}>
			<Label
				className="block"
				text="Enter Email:"
				htmlFor={inputName}
			/>
			<div className="relative">
				<Input
					className="block full_width"
					onChange={emailChanged}
					value={props.email}
					name={inputName}
				/>
				<Button 
					onClick={() => { resetEmail(); }}
					text="×"
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
				email={props.email}
				setEmail={(email: string) => props.setEmail(email)}
			/>
			<ValidationMessage
				validationMessage={props.emailMessage}
				validationType={validationType}
			/>
		</div>
	)
}

export default EmailValidationForm;
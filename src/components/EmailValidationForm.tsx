import React from "react";
import Label from "./form/Label";
import Input from "./form/Input";
import { allKeyboardKeysRegex } from "../utility/Regex";
import { atCharacter } from "../utility/String";

interface EmailValidationForm {
	setEmail: (email: string) => void,
	setEmailMessage: (emailMessage: string) => void,
	email: string,
	setEmailIsValid: (emailIsValid: boolean) => void
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

const rules: Validator[] = 
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
	const handleSettingEmailMessage = (email: string) => 
	{
		for (let i: number = 0; i < rules.length; i++)
		{
			const rule: Validator = rules[i];

			if (!rule.validationFunctionToPass(email))
			{
				props.setEmailIsValid(false);
				props.setEmailMessage(rule.errorMessageIfFailed);
				return;
			}
		}

		//email passed all validation tests
		props.setEmailIsValid(true);
		props.setEmailMessage("Email appears to be valid");
	}
	
	const emailChangedEvent = (email: string): void => 
	{		
		props.setEmail(email);

		if (email)
		{
			handleSettingEmailMessage(email);
		} 
		else 
		{
			props.setEmailIsValid(false);
			props.setEmailMessage("");
		}	
	}
	
	return (
		<>
			<Label 
				className="block float_left"
				text="Enter Email"
			/>
			<br />
			<Input
				className="block float_left clear_left full_width"
				onChange={emailChangedEvent}
				value={props.email}
			/>
		</>
	)
}

export default EmailValidationForm;
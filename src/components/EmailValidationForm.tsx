import React from "react";
import Label from "./form/Label";
import Input from "./form/Input";
import {
	allKeyboardKeysRegex
} from "../repository/Regex";

interface IEmailValidationForm {
	setEmail: (email: string) => void,
	setEmailMessage: (emailMessage: string) => void,
	email: string
}

interface IValidator {
	validationFunctionToPass: (email: string) => boolean
	errorMessageIfFailed: string;
}

const atCharacter : string = "@";

const doesEmailHaveDomain = (email : string): boolean => 
{
	return email.split(atCharacter)[1].includes(".");
}

const isDomainInEmail = (email : string) : boolean => 
{
	let emailSplitOnAtCharacter : string[] = email.split(atCharacter);

	if(emailSplitOnAtCharacter.length < 2)
	{
			return false;
	}
	
	return true;
}

const rules: IValidator[] = 
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
	// ,
	// {
	//     validationFunctionToPass: (email: string) => this.IsEmailValid(email),
	//     errorMessageIfFailed: "this email isn't valid"
	// }
];

const EmailValidationForm = (props: IEmailValidationForm) => 
{
	const handleSettingEmailMessage = (email: string) => 
	{
		for (let i: number = 0; i < rules.length; i++)
		{
			const rule: IValidator = rules[i];

			if(!rule.validationFunctionToPass(email))
			{
				props.setEmailMessage(rule.errorMessageIfFailed);
				return;
			}
		}

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
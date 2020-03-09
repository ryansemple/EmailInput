import React from "react";
import Suggestions from "../components/Suggestions";
import {
	allKeyboardKeysRegex,
	isAlphaNumericRegex,
	isValidEmailRegex
} from "../repository/Regex"
import axios, { AxiosError } from "axios";
import {  KickBoxResponse } from "../repository/Kickbox"

interface IEmailInputState {
	emailMessage?: string;
	emailSuggestions: string[],
	showSuggestions: boolean,
	email: string,
	isEmailVerified: boolean
}

interface IEmailInputProps {}

interface IValidator {
	validationFunctionToPass: (email: string) => boolean
	errorMessageIfFailed: string;
}

interface IEmailSuggestion {
	emailDomain: string,
	selected: boolean,
	visible: boolean
}

const atCharacter : string = "@";

export default class EmailInput extends 
React.PureComponent<IEmailInputProps, IEmailInputState> 
{
	popularEmailDomains : string[] =
	[
		"yahoo",
		"gmail",
		"hotmail",
		"live",
		"outlook",
		"aol"
	];

	constructor(props: IEmailInputProps)
	{
		super(props);
		this.state = { 
			emailMessage: "",
			emailSuggestions: [],
			showSuggestions: false,
			email: "",
			isEmailVerified: false
		};
	}

	rules: IValidator[] = 
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
			validationFunctionToPass: (email: string) => this.doesEmailHaveDomain(email),
			errorMessageIfFailed: `Email doesn't contain a domain name (name after the '${atCharacter}' symbol)`
		},
		{
			validationFunctionToPass: (email: string) => email.split(atCharacter).length === 2,
			errorMessageIfFailed: `Email can only contain one '${atCharacter}' symbol`
		},
		{
			validationFunctionToPass: (email: string) => this.isDomainInEmail(email),
			errorMessageIfFailed: "Email doesn't contain a domain"
		}
		// ,
		// {
		//     validationFunctionToPass: (email: string) => this.IsEmailValid(email),
		//     errorMessageIfFailed: "this email isn't valid"
		// }
	];

	isDomainInEmail = (email : string) : boolean => 
	{
		let emailSplitOnAtCharacter : string[] = email.split(atCharacter);

		if(emailSplitOnAtCharacter.length < 2)
		{
				return false;
		}
		
		return true;
	}

	IsEmailValid = (email : string) : boolean => 
	{
		return isValidEmailRegex.test(email.toLowerCase());
	};

	// isBeginningPartOfEmailValid = (email : string) : boolean => {
	//     //let localPartOfEmail : any = email.split(atCharacter).shift();
	//     let regexPattern : RegExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))/);
	//     return regexPattern.test(email.toLowerCase());
	// }

	doesEmailHaveDomain = (email : string): boolean => 
	{
		return email.split(atCharacter)[1].includes(".");
	}

    handleEmailInputChanged = (event: React.FormEvent<HTMLInputElement>) : void => {       
			const email: string = event.currentTarget.value;

			//this.setState({ email });
			this.handleSuggestions(email);
			this.setState({ showSuggestions: true, email });

			for (let i: number = 0; i < this.rules.length; i++)
			{
				const rule: IValidator = this.rules[i];

				if(!rule.validationFunctionToPass(email))
				{
					this.setState({ emailMessage: rule.errorMessageIfFailed });
					return;
				}
			}

			this.setState({ emailMessage: "" });
    };

    checkForDomainToMatchEmail = (
			emailCharactersAfterAtCharacter: string, 
			popularEmailDomain: string,
			emailCharactersBeforeAtCharacter: string
    ): string => 
    {
			let suggestedEmail: string = "";
			const popularEmailDomainCharacters: string[] = popularEmailDomain.split("");
			let popularEmailMatch: boolean = true;
			
			for (let i2 = 0; i2 < emailCharactersAfterAtCharacter.length; i2++)
			{
				if 
				(
					popularEmailDomainCharacters[i2] &&
					popularEmailDomainCharacters[i2] !== emailCharactersAfterAtCharacter[i2]
				)
				{
					popularEmailMatch = false;
					break;
				}
			}

			if(popularEmailMatch)
			{
				suggestedEmail = `${emailCharactersBeforeAtCharacter}@${popularEmailDomain}.com`;
			}

			return suggestedEmail;
    }

    isAlphaNumeric = (input: string): boolean => isAlphaNumericRegex.test(input);

    handleSuggestions = (email: string): void => 
    {
			let newEmailSuggestions: string[] = [];

			for(let i = 0; i < this.popularEmailDomains.length; i++) 
			{
				let suggestedEmail: string = "";
				const popularEmailDomain: string = this.popularEmailDomains[i];

				if(!email.includes(atCharacter))
				{
						suggestedEmail = `${email}@${popularEmailDomain}.com`;
				}

					if(email.includes(atCharacter))
				{
					const emailSplitByAtCharacter: string[] = email.split(atCharacter);
					const emailCharactersAfterAtCharacter: string = emailSplitByAtCharacter[1];
					const emailCharactersBeforeAtCharacter: string = emailSplitByAtCharacter[0];

					if
					(
						emailCharactersAfterAtCharacter && 
						!this.isAlphaNumeric(emailCharactersAfterAtCharacter)
					)
					{
							continue;
					}
					
					if(emailCharactersAfterAtCharacter.length === 0)
					{
						suggestedEmail = `${email}${popularEmailDomain}.com`;
					} 
					else 
					{
						suggestedEmail = this.checkForDomainToMatchEmail
						(
							emailCharactersAfterAtCharacter,
							popularEmailDomain,
							emailCharactersBeforeAtCharacter
						);

						if(suggestedEmail == "")
						{
							continue;
						}
					}    
				}
					
				if(suggestedEmail && suggestedEmail !== "")
				{
					newEmailSuggestions.push(suggestedEmail);
				}     
			}

			if(email)
			{
				this.setState((previousState: IEmailInputState) => ({
					emailSuggestions: newEmailSuggestions
				}));
			} 
			else 
			{
				this.setState((previousState: IEmailInputState) => ({
					emailSuggestions: []
				}));
			}
    }

    checkEmail = () => 
    {       
        // axios.request<KickBoxData>
        // ({
        //     url: `http://localhost:3001/VerifyEmail?email=${this.state.email}`,
        //     transformResponse: (response: KickBoxResponse) => response.data
        // })
        // .then((response) =>
        // {
        //     debugger
        //     //const successfullySent: boolean = response.data.success;
        //     this.setState({
        //         isEmailVerified: true,
        //         emailMessage: response.data.reason
        //     })
        // });
        
			axios.get
			(
				`http://localhost:3001/VerifyEmail?email=${this.state.email}`
			)
			.then((response: KickBoxResponse) =>
			{
				const successfullySent: boolean = response.data.success;
				console.log(successfullySent);
				
				this.setState({
					isEmailVerified: successfullySent,
					emailMessage: successfullySent ? "" : response.data.reason
				})
			});
    }

    emailSuggestionClickEvent = (email: string): void => 
			this.setState(({ email }));

		render() 
		{
			return (
				<div className="container">
					<div className="text_align_center">
						<div className="col-sm-12 float_left">
							<div className="row">
								<div className="col-sm-18">
									<label className="Email_Label block float_left">Enter Email:</label>
									<br />
									<input 
										className="form_input block float_left clear_left full_width"
										onChange={this.handleEmailInputChanged}
										value={this.state.email}
									/>
									<br />
									<Suggestions 
										showSuggestions={this.state.showSuggestions}
										emailSuggestions={this.state.emailSuggestions}
										emailSuggestionClickEvent={this.emailSuggestionClickEvent}
									/>
								</div>
								<div className="col-sm-6">
									<label className="block">
										&nbsp;
									</label>
									<button 
										onClick={this.checkEmail}
										disabled={(
											this.state.emailMessage !== null && 
											this.state.emailMessage !== undefined && 
											this.state.emailMessage !== "" && 
											this.state.emailMessage.length > 0
										)}
										style={{
											background: this.state.isEmailVerified ? "green" : "#FF6600"
										}}
										className="Button">    
										{this.state.isEmailVerified ? "Verified!" : "Verify"}
									</button>
								</div>
							</div>
						</div>
						<div className="col-sm-12 float_left">
							<label className="block float_left">
									Information:
							</label>
							<p 
								className="error margin_bottom_20 block float_left full_width">
								{
								this.state.emailMessage ? 
								this.state.emailMessage : 
								null
								}
							</p>
						</div>
					</div>
				</div>
			);
	};
};
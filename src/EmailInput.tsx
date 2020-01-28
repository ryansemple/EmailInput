import React from 'react';

interface IEmailInputState {
    emailMessage?: string;
    emailSuggestions: string[],
    showSuggestions: boolean,
    email: string
}

interface IEmailInputProps {
}

interface IValidator {
    validationFunctionToPass: (email: string) => boolean
    errorMessageIfFailed: string;
}

const allKeyboardKeysRegex : RegExp = new RegExp(/^[a-zA-Z0-9~`!@#\$%\^&\*\(\)_\-\+={\[\}\]\|\\:;"'<,>\.\?\/  ]*$/);

const atCharacter : string = "@";

export default class EmailInput extends React.PureComponent<IEmailInputProps, IEmailInputState> {

    popularEmailDomains : string[] =
    [
        "yahoo",
        "gmail",
        "hotmail",
        "live",
        "outlook"
    ];

    constructor(props: IEmailInputProps){
        super(props);
        this.state = { 
            emailMessage: "",
            emailSuggestions: [],
            showSuggestions: false,
            email: ""
        };
        this.handleEmailInputChanged = this.handleEmailInputChanged.bind(this);
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

    isDomainInEmail = (email : string) : boolean => {
        let emailSplitOnAtCharacter : string[] = email.split(atCharacter);

        if(emailSplitOnAtCharacter.length < 2)
        {
            return false;
        }
        
        return true;
    }

    IsEmailValid = (email : string) : boolean => {
        let regexPattern : RegExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

        return regexPattern.test(email.toLowerCase());
    };

    // isBeginningPartOfEmailValid = (email : string) : boolean => {
    //     //let localPartOfEmail : any = email.split(atCharacter).shift();
    //     let regexPattern : RegExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))/);
    //     return regexPattern.test(email.toLowerCase());
    // }

    doesEmailHaveDomain = (email : string): boolean => {
        return email.split(atCharacter)[1].includes(".");
    }

    handleEmailInputChanged = (event: React.FormEvent<HTMLInputElement>) : void => {       
        const email: string = event.currentTarget.value;

        this.setState({ email });

        this.handleSuggestions(email);

        setTimeout(() => {
            this.setState({ showSuggestions: true });
        }, 300); 

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

    handleSuggestions = (email: string) => {

        // this.setState((previousState: IEmailInputState) => ({
        //     emailSuggestions: [
        //         ...previousState.emailSuggestions, 
        //         "a"
        //     ]
        // }));


        let newEmailSuggestions: string[] = [];

        for(let i = 0; i < this.popularEmailDomains.length; i++) 
        {
            let suggestedEmail: string = "";

            if(!email.includes(atCharacter))
            {
                suggestedEmail = `${email}@${this.popularEmailDomains[i]}.com`;
            }

            if(email.includes(atCharacter))
            {
                suggestedEmail = `${email}${this.popularEmailDomains[i]}.com`;
            }
            
            newEmailSuggestions.push(suggestedEmail);
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

    delay = (ms: number): any => new Promise(res => setTimeout(res, ms));

    // emailSuggestionClickEvent = (event: React.MouseEvent<HTMLLIElement, MouseEvent>): void => 
    // {
    //     this.setState((previousState: IEmailInputState) => ({
    //         email: ""
    //     }));
    // }

    emailSuggestionClickEvent = (email: string): void => 
    {
        this.setState(({ email }));
    }

    render(){
        return(
            <div className="container">
                <div className="text_align_center">
                    <div className="Email clear_children_float margin_top_40 inline_block">
                    <p className="margin_top_10 error text_align_center margin_bottom_20">{this.state.emailMessage ? this.state.emailMessage : null}</p>
                        <label className="Email_Label block float_left">Enter Email:</label>
                        <br />
                        <input 
                            className="Email_Input block float_left clear_left" 
                            onChange={this.handleEmailInputChanged}
                            value={this.state.email}
                        /> 
                        <br />
                        <div
                            style={{ 
                                maxHeight: 36 * this.state.emailSuggestions.length,
                                display: this.state.showSuggestions ? 
                                "block" : 
                                "none"
                            }}
                            className="Email_Suggestions float_left">
                            <ul>
                            {this.state.emailSuggestions
                            .map
                            (
                                (emailSuggestion: string, i: number) => 
                                <li 
                                    onClick={() => this.emailSuggestionClickEvent(emailSuggestion)}
                                    key={emailSuggestion}
                                    className="Email_Suggestions_Suggestion">
                                    {emailSuggestion}
                                </li>
                            )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};
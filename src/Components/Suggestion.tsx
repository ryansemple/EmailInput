import React, { PureComponent } from "react";

interface ISuggestionProps {
    emailSuggestion: string,
    emailSuggestionClickEvent: any
}

export default class Suggestions 
extends PureComponent<ISuggestionProps> 
{
    render = () => 
    <li 
        onClick={() => this.props.emailSuggestionClickEvent(this.props.emailSuggestion)}
        key={this.props.emailSuggestion}
        className="Email_Suggestions_Suggestion">
        {this.props.emailSuggestion}
    </li>
}
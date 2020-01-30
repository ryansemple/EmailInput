import React, { PureComponent } from "react";

import Suggestion from "../Components/Suggestion";

interface ISuggestionsProps {
    showSuggestions: boolean,
    emailSuggestions: string[],
    emailSuggestionClickEvent: any
}

export default class Suggestions 
extends PureComponent<ISuggestionsProps> 
{
    render = () => 
    <div
    className={`${this.props.showSuggestions ? "show" : ""} Email_Suggestions float_left`}>
        <ul>
        {this.props.emailSuggestions
        .map
        (
            (emailSuggestion: string, index: number) => 
            <Suggestion 
                emailSuggestion={emailSuggestion}
                emailSuggestionClickEvent={this.props.emailSuggestionClickEvent}
            />
        )}
        </ul>
    </div>
}
import React, { PureComponent } from "react";

import Suggestion from "../components/Suggestion";

interface ISuggestionsProps {
	showSuggestions: boolean,
	emailSuggestions: string[],
	emailSuggestionClickEvent: any
}

const Suggestions = (props: ISuggestionsProps) => {
	return (
		<div
			className={`${props.showSuggestions ? "show" : ""} Email_Suggestions float_left`}>
			<ul>
				{props.emailSuggestions
				.map
				(
					(emailSuggestion: string, index: number) => 
					<Suggestion
						key={emailSuggestion}
						emailSuggestion={emailSuggestion}
						emailSuggestionClickEvent={props.emailSuggestionClickEvent}
					/>
				)}
			</ul>
		</div>   
	)
}

export default Suggestions;
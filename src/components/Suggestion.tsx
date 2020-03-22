import React from "react";

interface ISuggestionProps {
	emailSuggestion: string,
	emailSuggestionClickEvent: any
}

const Suggestions = (props: ISuggestionProps) => (
	<li
		onClick={() => props.emailSuggestionClickEvent(props.emailSuggestion)}
		key={props.emailSuggestion}
		className="Email_Suggestions_Suggestion">
		{props.emailSuggestion}
	</li>
)

export default Suggestions;
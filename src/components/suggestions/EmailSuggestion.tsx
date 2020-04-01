import React from "react";

interface SuggestionProps {
	emailSuggestion: string,
	emailSuggestionClickEvent: any
}

const EmailSuggestion = (props: SuggestionProps) => (
	<li
		onClick={() => props.emailSuggestionClickEvent(props.emailSuggestion)}
		key={props.emailSuggestion}
		className="EmailSuggestions_Suggestion">
		{props.emailSuggestion}
	</li>
)

export default EmailSuggestion;
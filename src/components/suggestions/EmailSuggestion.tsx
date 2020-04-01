import React from "react";

interface SuggestionProps {
	emailSuggestion: string,
	onClick: (suggestedEmail: string) => void
}

const EmailSuggestion = (props: SuggestionProps) => (
	<li
		onClick={
			() => props.onClick(props.emailSuggestion)
		}
		className="EmailSuggestions_Suggestion">
		{props.emailSuggestion}
	</li>
)

export default EmailSuggestion;
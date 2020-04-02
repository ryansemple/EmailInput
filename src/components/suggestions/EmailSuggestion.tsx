import React from "react";

interface SuggestionProps {
	emailSuggestion: string,
	onClick: (suggestedEmail: string) => void
}

/**
 * An individual email suggestion. When clicked it will set the
 * email input to be the clicked suggestion.
 */
const EmailSuggestion = (props: SuggestionProps) => (
	<li
		onClick={() => props.onClick(props.emailSuggestion)}
		className="EmailSuggestions_Suggestion">
		{props.emailSuggestion}
	</li>
)

export default EmailSuggestion;
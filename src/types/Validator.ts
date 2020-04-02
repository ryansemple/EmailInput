interface Validator {
	validationPredicateToPass: (email: string) => boolean
	errorMessageIfFailed: string;
}

export default Validator;
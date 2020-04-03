interface Validator {
	predicateMeansFailIfTrue: (email: string) => boolean
	errorMessageIfFailed: string;
}

export default Validator;
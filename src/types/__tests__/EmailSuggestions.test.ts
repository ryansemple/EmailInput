import EmailSuggestions from "../EmailSuggestions";
import EmailSuggestion from "../EmailSuggestion";

test("EmailSuggestions constructor sets emailSuggestions property correctly.", 
() => 
{
	const expectedEmailSuggestions: string[] = [
		"yahoo.com",
		"yahoo.ca",
		"yahoo.co.uk",
		"gmail.com",
		"gmail.ca",
		"gmail.co.uk",
		"hotmail.com",
		"hotmail.ca",
		"hotmail.co.uk",
		"live.com",
		"live.ca",
		"live.co.uk",
		"outlook.com",
		"outlook.ca",
		"outlook.co.uk"
	];
	
	const emailSuggestions: EmailSuggestions = new EmailSuggestions();
	let actualEmailSuggestions: string[] = [];
	
	for(let i: number = 0; i < emailSuggestions.emailSuggestions.length; i++)
	{
		const emailSuggestion: EmailSuggestion = emailSuggestions.emailSuggestions[i];
		actualEmailSuggestions.push(emailSuggestion.returnEmailAfterAtCharacter());
	}
	
	expect(actualEmailSuggestions).toEqual(expectedEmailSuggestions);
});

test("returnValidEmailSuggestions returns valid email suggestions for a given email (case 1).", 
() => 
{
	const emailSuggestions: EmailSuggestions = new EmailSuggestions();

	const actualEmailSuggestions: string[] = emailSuggestions
		.returnValidEmailSuggestions("andrew@gm");
	
	const expectedEmailSuggestions: string[] = [
		"andrew@gmail.com",
		"andrew@gmail.ca",
		"andrew@gmail.co.uk"
	];
	
	expect(actualEmailSuggestions).toEqual(expectedEmailSuggestions);
});

test("returnValidEmailSuggestions returns valid email suggestions for a given email (case 2).", 
() => 
{
	const emailSuggestions: EmailSuggestions = new EmailSuggestions();

	const actualEmailSuggestions: string[] = emailSuggestions
		.returnValidEmailSuggestions("dsa+5@outlook.co");
	
	const expectedEmailSuggestions: string[] = [
		"dsa+5@outlook.com",
		"dsa+5@outlook.co.uk"
	];
	
	expect(actualEmailSuggestions).toEqual(expectedEmailSuggestions);
});
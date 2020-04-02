/**
 * Returns a new unique uuid.
 * Based off this solution: https://stackoverflow.com/a/13423320
 * Example return value: "b37c864f-afeb-402a-97e9-9c90e5af124c"
 */
export const returnNewUuid = (): string =>
{
	let randomNumber: number;
	let randomString: string = "";

	do
	{
		randomString += (randomNumber = Math.random())
			.toString(16)
			.substr(3, 6);
	}
	while (randomString.length < 30);

	return (
		randomString.substr(0, 8) + "-" +
		randomString.substr(8, 4) + "-4" +
		randomString.substr(12, 3) + "-" +
		((randomNumber * 4 | 0) + 8).toString(16) +
		randomString.substr(15, 3) + "-" +
		randomString.substr(18, 12)
	);
};
import React from "react";
import { returnNewUuid } from "../Uuid";

test('returnNewUuid should return a unique and valid uuid.', 
() => {

	const uuid: string = returnNewUuid();
	const validUuidLength: number = 36;
	const dash: string = "-";
	const validDashIndexes: number[] = [8,	13, 18,	23];

	for(let i: number = 0; i < validDashIndexes.length; i++)
	{
		const currentDashIndex: number = validDashIndexes[i];
		expect(uuid[currentDashIndex]).toBe(dash);
	}
	
	expect(uuid.length).toBe(validUuidLength);
});
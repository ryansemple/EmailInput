import { returnItemsInArrayNotInAnotherArrayById } from "../Array";
import ObjectWithId from "../../types/ObjectWithId";

test('returnItemsInArrayNotInAnotherArrayById should return an array with one item that the same properties as the expectedDifferentItem variable.', () => {

	interface TestObject extends ObjectWithId {
		title: string;
		id: string;
	}

	const expectedDifferentItem: TestObject = {
		title: "c",
		id: "3"
	};

	const array1: TestObject[] = 
	[
		{
			title: "a",
			id: "1"
		},
		{
			title: "b",
			id: "2"
		},
		expectedDifferentItem
	];

	const array2: TestObject[] = 
	[
		{
			title: "a",
			id: "1"
		},
		{
			title: "b",
			id: "2"
		}
	];

	const differentItem: TestObject = returnItemsInArrayNotInAnotherArrayById(
		array1,
		array2
	)[0];
	
	expect(differentItem.title).toBe(expectedDifferentItem.title);
	expect(differentItem.id).toBe(expectedDifferentItem.id);
});
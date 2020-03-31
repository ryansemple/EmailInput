import { returnItemsInArrayNotInAnotherArrayById } from "../Array";
import ObjectWithId from "../../types/ObjectWithId";

test('returnItemsInArrayNotInAnotherArrayById should return an array with one item that has the same properties as the expectedDifferentItem object.', () => {

	interface TestObject extends ObjectWithId {
		title: string;
		id: string;
	}

	const expectedDifferentItem: TestObject = {
		title: "c",
		id: "3"
	};

	const arrayWithDifferentItem: TestObject[] = 
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

	const arrayWithoutDifferentItem: TestObject[] = 
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
		arrayWithDifferentItem,
		arrayWithoutDifferentItem
	)[0];
	
	expect(differentItem.title).toBe(expectedDifferentItem.title);
	expect(differentItem.id).toBe(expectedDifferentItem.id);
});
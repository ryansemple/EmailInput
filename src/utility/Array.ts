import ObjectWithId from "../types/ObjectWithId";

/**
 * Returns all items in the first array passed that do not have
 * matching records in the second array passed based on the ids
 * of the items in the array. Arrays passed must extend
 * @interface ObjectWithId to be passed to this function.
 */
export const returnItemsInArrayNotInAnotherArrayById =
<T extends ObjectWithId> (firstArray: T[], secondArray: T[]): Array<T> =>
{
	return firstArray
	.filter((firstArrayItem: T) =>
		secondArray.findIndex((secondArrayItem: T) =>
			firstArrayItem.id === secondArrayItem.id
		) === -1
	);
}
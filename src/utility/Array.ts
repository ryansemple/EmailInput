import ObjectWithId from "../types/ObjectWithId";

export const returnItemsInArrayNotInAnotherArrayById =
<T extends ObjectWithId> (firstArray: T[], secondArray: T[]) =>
{
	return firstArray
	.filter((firstArrayItem: T) => 
	{
		return secondArray.findIndex((secondArrayItem: T) =>
			firstArrayItem.id === secondArrayItem.id
		) === -1;
	});
}
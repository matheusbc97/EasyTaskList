interface IDoesListItemNeedsMoreMargin {
  index: number;
  arrayLength: number;
  columns: number;
}

export function doesListItemNeedsMoreMargin({
  arrayLength,
  columns,
  index,
}: IDoesListItemNeedsMoreMargin) {
  const isLastItem = index === arrayLength - 1;

  const arrayHasRemainder = arrayLength % columns !== 0;
  return arrayHasRemainder && isLastItem;
}

export function doesListItemNeedsMoreMargin(
  index: number,
  arrayLength: number,
) {
  return arrayLength % 3 !== 0 && index === arrayLength - 1;
}

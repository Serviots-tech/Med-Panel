export function invalidText(value: string | number | null | undefined) {
	return (
		value === null ||
		value === undefined ||
		value.toString().trim().length === 0
	);
}
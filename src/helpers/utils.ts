export function invalidText(value: string | number | null | undefined) {
	return (
		value === null ||
		value === undefined ||
		value.toString().trim().length === 0
	);
}

export function validateFormData(
	dataObj: { [key: string]: any },
	errObj: { [key: string]: boolean }
): { [key: string]: boolean } {
	Object.keys(dataObj).forEach((key) => {
		if (Object.hasOwn(errObj, key)) {
			errObj[key] = invalidText(dataObj[key]);
		}
	});

	return errObj;
}

export function hasFormError(errObj: { [key: string]: boolean }): boolean {
	return Object.keys(errObj).some((key) => {
		return errObj[key];
	});
}
export const getValidationErrorsByKey = (
	errors: { key: string; messages: string[] }[],
	key: string,
) => {
	return errors.find((error) => error.key === key)?.messages;
};

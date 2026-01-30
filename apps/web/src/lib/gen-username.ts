/**
 * Generates a URL-safe username from first and last name, with an optional
 * random suffix to reduce collisions.
 */
export const gen_username = (
	firstname: string,
	surname: string,
	options?: { addSuffix?: boolean }
): string => {
	const base = [firstname, surname]
		.join("_")
		.toLowerCase()
		.replace(/\s+/g, "_")
		.replace(/[^a-z0-9_]/g, "");

	if (base.length === 0) {
		return `user_${Math.random().toString(36).slice(2, 8)}`;
	}

	const suffix =
		options?.addSuffix !== false
			? `_${Math.random().toString(36).slice(2, 6)}`
			: "";
	return `${base}${suffix}`;
};

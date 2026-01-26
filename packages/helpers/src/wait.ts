/**
 * Wait for a given duration
 * @param duration - The duration to wait in milliseconds
 * @returns
 */
export async function wait(
	duration: number = 1000,
	env: "development" | "production" = "development"
) {
	if (env === "production") return;
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(true);
		}, duration);
	});
}

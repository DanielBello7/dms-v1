import { toaster } from "@/lib";
import { ensure_error } from "@repo/helpers";
import { useCallback, useState } from "react";

/**
 * Hook for wrapping async actions with built-in loading and error handling.
 *
 * Example:
 * const { isLoading, run } = useAsyncHandler();
 * await run(async () => { await api.doSomething(); });
 */
export function useAsyncHandler(dependencies: unknown[] = []) {
	const [isLoading, setIsLoading] = useState(false);

	const run = useCallback(
		async <T>(
			callback: () => Promise<T | undefined>
		): Promise<T | undefined> => {
			setIsLoading(true);
			try {
				return await callback();
			} catch (error) {
				console.error(error);
				toaster.error(ensure_error(error).message);
			} finally {
				setIsLoading(false);
			}
		},
		dependencies
	);

	return {
		isLoading,
		setIsLoading,
		run,
	};
}

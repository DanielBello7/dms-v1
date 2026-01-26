import { ensure_error } from "@repo/helpers";
import { useCallback, useEffect, useRef, useState } from "react";

type Params = {
	onlogout: () => void;
	jwt: string | undefined | null;
	validation: () => Promise<void>;
};

export const useLogic = (data: Params) => {
	const [isLoading, setIsLoading] = useState(true);
	const isFetching = useRef<boolean>(false);

	const authenticate = useCallback(async () => {
		try {
			if (!data.jwt) return data.onlogout();
			await data.validation();
		} catch (error) {
			console.error(ensure_error(error).message);
			data.onlogout();
		} finally {
			setIsLoading(false);
		}
	}, [data]);

	useEffect(() => {
		authenticate();
	}, [authenticate]);

	return {
		isLoading,
		isFetching,
		authenticate,
		signout: data.onlogout,
	};
};

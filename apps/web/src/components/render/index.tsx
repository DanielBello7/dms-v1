import { type ReactNode, useEffect } from "react";
import { Exception } from "./exception";
import { Pending } from "./pending";

type Props<T> = {
	data: T | undefined | null;
	exceptions?: (error: unknown) => ReactNode;
	loader?: ReactNode;
	no_data?: ReactNode;
	empty?: ReactNode;
	error: unknown;
	isError: boolean;
	isLoading: boolean;
	retry?: () => void;
	render: (data: T) => ReactNode;
	onData?: (data: T) => void;
};

export const Render = <T,>(props: Props<T>) => {
	// prettier-ignore
	const {
    data,
    exceptions,
    loader,
    error,
    isError,
    isLoading,
    retry,
    render,
    no_data,
    empty,
    onData,
  } = props;

	useEffect(() => {
		if (data) {
			onData?.(data);
		}
	}, [data, onData]);

	if (isLoading) {
		return loader ?? <Pending />;
	}

	if (isError) {
		return exceptions ? (
			exceptions(error)
		) : (
			<Exception error={error} occupy retry={retry} />
		);
	}

	if (data) {
		if (Array.isArray(data)) {
			return data.length > 0 ? render(data) : (empty ?? <p>Empty data</p>);
		}
		return render(data);
	}

	return no_data ?? <p>No data</p>;
};

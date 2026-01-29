import type { IPagePaginated } from "@repo/types";
import { Pages } from "./pages";

type Props<T> = {
	data: IPagePaginated<T> | undefined;
	change: (v: number) => void;
};
export const Footer = <T,>(props: Props<T>) => {
	return (
		<div className="p-2">
			{props.data && <Pages data={props.data} change={props.change} />}
		</div>
	);
};

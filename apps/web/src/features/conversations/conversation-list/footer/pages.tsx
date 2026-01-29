import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import type { IPagePaginated } from "@repo/types";

type Props<T> = {
	data: IPagePaginated<T>;
	change: (v: number) => void;
};
export const Pages = <T,>(props: Props<T>) => {
	return (
		<Pagination>
			<PaginationContent>
				{props.data.prev_page && (
					<PaginationItem>
						<PaginationPrevious
							onClick={() => {
								props.change(props.data.page - 1);
							}}
						/>
					</PaginationItem>
				)}
				{props.data.page > 1 && (
					<PaginationItem>
						<PaginationLink
							onClick={() => {
								props.change(props.data.page - 1);
							}}>
							{props.data.page - 1}
						</PaginationLink>
					</PaginationItem>
				)}
				<PaginationItem>
					<PaginationLink isActive>{props.data.page}</PaginationLink>
				</PaginationItem>
				{props.data.next_page && (
					<PaginationItem>
						<PaginationLink
							onClick={() => {
								props.change(props.data.next_page!);
							}}>
							{props.data.next_page}
						</PaginationLink>
					</PaginationItem>
				)}
				{props.data.total_pages > props.data.page + 2 && (
					<PaginationItem>
						<PaginationEllipsis
							onClick={() => {
								props.change(props.data.page + 2);
							}}
						/>
					</PaginationItem>
				)}
				{props.data.has_next_page && (
					<PaginationItem>
						<PaginationNext
							onClick={() => {
								props.change(props.data.page + 1);
							}}
						/>
					</PaginationItem>
				)}
			</PaginationContent>
		</Pagination>
	);
};

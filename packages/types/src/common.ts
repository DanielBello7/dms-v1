export type ICommon = {
	id: string;
	ref_id: string;
	created_at: Date;
	updated_at: Date;
	deleted_at: Date | undefined;
};

export type IPaginated<T> = {
	docs: T[];
	total_docs: number;
	pick: number;
	page: number;
	total_pages: number;
	has_next_page: boolean;
	next_page: number | null;
	has_prev_page: boolean;
	prev_page: number | null;
	paging_counter: number;
};

export type BaseOmit<T> = Omit<
	T,
	"id" | "created_at" | "updated_at" | "deleted_at"
>;

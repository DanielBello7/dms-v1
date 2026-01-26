export function build_query_string(query: Record<string, any>) {
	return Object.entries(query)
		.filter(([_, value]) => value !== undefined)
		.map(([key, value]) => {
			return `${key}=${encodeURIComponent(value as typeof value)}`;
		})
		.join("&");
}

import { useLogic } from "./use-logic";
import { Render } from "@/components/render";
import { EmptyConversations } from "./empty";
import { Fragment } from "react/jsx-runtime";
import { Convo } from "./convo";
import { Search } from "./search";
import { Footer } from "./footer";

export const ConversationList = () => {
	const logic = useLogic();
	return (
		<div className="size-full overflow-hidden flex flex-col">
			<div className="w-full">
				<Search />
			</div>
			<div className="border-t border-b flex grow flex-col">
				<Render
					data={logic.conversations}
					error={logic.query.error}
					isError={logic.query.isError}
					isLoading={logic.query.isFetching}
					empty={<EmptyConversations />}
					retry={logic.query.refetch}
					render={(docs) => {
						return (
							<Fragment>
								{docs.map((d, idx) => (
									<Convo data={d} key={idx} idx={idx} />
								))}
							</Fragment>
						);
					}}
				/>
			</div>
			<div className="w-full">
				<Footer />
			</div>
		</div>
	);
};

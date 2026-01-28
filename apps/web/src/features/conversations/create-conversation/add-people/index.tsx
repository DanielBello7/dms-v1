import { Button, Input, Separator } from "@/components/ui";
import { Search, X } from "lucide-react";
import { Person } from "./person";
import { useLogic } from "./use-logic";
import { EmptyResults } from "./empty";

export const AddPeople = () => {
	const logic = useLogic();
	// const is_active = logic.values.search.trim().length > 0;
	return (
		<div className="w-full h-full p-10 px-5 pb-0 flex flex-col">
			<div className="w-10/12 m-auto space-y-5 px-5">
				<div className="space-y-3">
					<p className="text-xl font-bold">People</p>
					<p className="text-muted-foreground text-sm">
						Get notified when ChatGPT responds to requests that take time, like
					</p>
				</div>

				<form
					className="w-full flex items-center"
					onSubmit={logic.form.handleSubmit(logic.submit)}>
					<Input
						id="username"
						type="text"
						placeholder="Search by email"
						{...logic.form.register("search")}
					/>
					<Button variant={"ghost"} className="cursor-pointer">
						<Search />
					</Button>
				</form>
				<Separator />
			</div>
			<div className="w-full grow grid grid-cols-3 gap-4 overflow-y-scroll py-5">
				{/* <div className="col-span-3">
					<EmptyResults action={logic.clear} />
				</div> */}
				{/* {new Array(10).fill(1).map(() => (
					<Person />
				))} */}
			</div>
		</div>
	);
};

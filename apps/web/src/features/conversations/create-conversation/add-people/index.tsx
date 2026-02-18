import { Button, Input, Separator, Spinner } from "@/components/ui";
import { Search } from "lucide-react";
import { useLogic } from "./use-logic";
import { Render } from "@/components/render";
import { Person } from "./person";
import { EmptyResults } from "./empty";
import { Placeholder } from "./placeholder";

export const AddPeople = () => {
  const logic = useLogic();
  return (
    <div className="w-full h-full px-5 pb-0 flex flex-col">
      <div className="w-full lg:w-10/12 m-auto space-y-5 py-5 lg:py-0 lg:px-5">
        <div className="space-y-3">
          <p className="text-xl font-bold">People</p>
          <p className="text-muted-foreground text-sm">
            Search by email to find and add people to your new conversation.
            Results appear below—add one or more people.
          </p>
        </div>

        <form
          className="w-full flex items-center border rounded-sm"
          onSubmit={logic.form.handleSubmit(logic.submit)}
        >
          <Input
            id="username"
            type="text"
            placeholder="Search by email"
            disabled={logic.handler.isLoading === true ? true : false}
            className="border-0"
            {...logic.form.register("search")}
          />
          <Button
            variant={"ghost"}
            className="cursor-pointer"
            type="submit"
            disabled={logic.handler.isLoading}
          >
            <Search />
          </Button>
        </form>
        <Separator />
      </div>
      <div className="grid w-full grow grid-cols-2 xl:grid-cols-3 gap-4 overflow-y-auto py-5 content-start items-start">
        {logic.showResults ? (
          <>
            <div className="col-span-3 flex items-center justify-between px-10">
              <p className="text-sm text-muted-foreground">Results</p>
              <Button
                variant={"link"}
                className="underline text-xs"
                size={"sm"}
                onClick={logic.clear}
              >
                Clear
              </Button>
            </div>
            <Render
              data={logic.results}
              error={logic.error}
              isError={Boolean(logic.error)}
              isLoading={logic.isLoading}
              loader={
                <div className="col-span-3 flex items-center justify-center">
                  <Spinner />
                </div>
              }
              empty={
                <div className="col-span-3">
                  <EmptyResults action={logic.clear} />
                </div>
              }
              render={(docs) => {
                return docs.map((p) => <Person data={p} key={p.ref_id} />);
              }}
            />
          </>
        ) : (
          <Placeholder />
        )}
      </div>
    </div>
  );
};

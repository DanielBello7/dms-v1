import { useLogic } from "./use-logic";
import { Render } from "@/components/render";
import { EmptyConversations } from "./empty";
import { Fragment } from "react/jsx-runtime";
import { Convo } from "./convo";
import { Search } from "./search";
import { Results } from "./results";
import { Footer } from "./footer";

export const ConversationList = () => {
  const logic = useLogic();
  const reset = () => {
    logic.setSearch("");
  };
  return (
    <div className="size-full overflow-hidden flex flex-col">
      <div className="w-full">
        <Search
          setSearch={logic.setSearch}
          value={logic.search}
          hasSearch={logic.has_search}
          reset={reset}
        />
      </div>
      <div className="border-t border-b flex grow flex-col">
        {logic.has_search && <Results data={logic.results} clear={reset} />}
        {logic.has_search === false && (
          <Render
            data={logic.conversations}
            error={logic.query.error}
            isError={logic.query.isError}
            isLoading={logic.query.isLoading}
            empty={<EmptyConversations />}
            retry={logic.query.refetch}
            render={(docs) => {
              return (
                <Fragment>
                  {docs
                    .sort((a, b) => {
                      const dateA = new Date(
                        a.LastMsg?.created_at ?? 0,
                      ).getTime();
                      const dateB = new Date(
                        b.LastMsg?.created_at ?? 0,
                      ).getTime();
                      return dateB - dateA; // newest first
                    })
                    .map((d, idx) => (
                      <Convo data={d} key={idx} />
                    ))}
                </Fragment>
              );
            }}
          />
        )}
      </div>
      <div className="w-full h-[52px]">
        <Footer
          data={logic.query.data}
          change={(v: number) => {
            logic.setParams({ ...logic.params, page: v });
          }}
        />
      </div>
    </div>
  );
};

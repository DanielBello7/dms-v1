import type { IConversationPopulated } from "@repo/services";
import { Fragment } from "react";
import { Message } from "./message";
import { useLogic } from "./use-logic";
import { Render } from "@/components/render";
import { Button, Spinner } from "@/components/ui";

type Props = {
  data: IConversationPopulated;
};

export const Messages = (props: Props) => {
  const logic = useLogic(props.data);
  return (
    <div className="flex h-full flex-col overflow-scroll" id="msgs-box">
      <Render
        isLoading={logic.isLoading}
        data={logic.messages}
        error={logic.error}
        isError={logic.isError}
        empty={
          <div className="w-full h-full flex items-center justify-center">
            No messages
          </div>
        }
        render={(messages) => {
          return (
            <Fragment>
              {logic.hasMore && (
                <div className="w-full flex items-center justify-center py-2">
                  {logic.handler.isLoading ? (
                    <Spinner />
                  ) : (
                    <Button
                      className="text-xs cursor-pointer"
                      size={"xs"}
                      onClick={logic.get_earlier}
                      variant={"outline"}
                    >
                      Load earlier
                    </Button>
                  )}
                </div>
              )}
              {messages.map((m) => (
                <Message
                  key={m.id}
                  data={m}
                  isGroup={props.data.ongoing_participants.length > 2}
                />
              ))}
            </Fragment>
          );
        }}
      />
    </div>
  );
};

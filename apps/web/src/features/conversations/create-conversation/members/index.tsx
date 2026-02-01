import {
  Button,
  Field,
  FieldDescription,
  FieldLabel,
  Input,
  ItemGroup,
  Separator,
  Spinner,
} from "@/components/ui";
import { EmptyMembers } from "./empty";
import { Render } from "@/components/render";
import { Member } from "./member";
import { useLogic } from "./use-logic";

export const Members = () => {
  const logic = useLogic();
  return (
    <div className="w-full h-full p-10 overflow-hidden flex flex-col pb-0">
      <div className="w-9/12 m-auto space-y-4">
        <p className="text-sm font-bold">New Chat</p>
        <p className="text-sm text-muted-foreground">
          Get notified when ChatGPT responds to requests that take time, like
          research or image generation.
        </p>

        {logic.members.length > 1 && (
          <Field>
            <FieldLabel htmlFor="input-demo-api-key">Group Name</FieldLabel>
            <Input
              id="input-demo-api-key"
              type="text"
              placeholder="Unnamed Group"
              disabled={logic.handler.isLoading}
              onChange={(e) => {
                const text = e.currentTarget.value;
                logic.form.setValue("name", text);
              }}
            />
            <FieldDescription className="text-xs">
              Add a name for your group
            </FieldDescription>
          </Field>
        )}

        <Button
          size={"sm"}
          onClick={logic.submit}
          disabled={logic.handler.isLoading}
          className="bg-[#ffd6a5]/80 text-black hover:bg-[#ffd6a5]/30 cursor-pointer"
        >
          {logic.handler.isLoading ? <Spinner /> : "Save"}
        </Button>
        <Separator />
      </div>
      <div className="grow w-9/12 m-auto space-y-4 overflow-y-scroll py-5">
        <Render
          data={logic.members}
          error={null}
          isError={false}
          isLoading={false}
          empty={<EmptyMembers />}
          render={(people) => {
            return (
              <ItemGroup className="max-w-sm space-y-3">
                {people.map((p) => (
                  <Member
                    data={p}
                    disabled={logic.handler.isLoading}
                    key={p.id}
                  />
                ))}
              </ItemGroup>
            );
          }}
        />
      </div>
    </div>
  );
};

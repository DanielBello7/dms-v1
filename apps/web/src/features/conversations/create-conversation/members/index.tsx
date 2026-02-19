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
    <div className="w-full h-full overflow-hidden flex flex-col pb-0">
      <div className="w-full lg:w-9/12 m-auto space-y-4 p-5 lg:p-5">
        <p className="text-sm font-bold">New Chat</p>
        <p className="text-sm text-muted-foreground">
          Start a new conversation by adding people below. You can name the
          group once more than one person is added.
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
          disabled={logic.handler.isLoading || logic.members.length < 1}
          className="bg-[#ffd6a5]/80 text-black hover:bg-[#ffd6a5]/30 cursor-pointer"
        >
          {logic.handler.isLoading ? <Spinner /> : "Save"}
        </Button>
        <Separator />
      </div>
      <div className="grow w-full lg:w-9/12 m-auto space-y-4 overflow-y-scroll p-5 lg:p-0 lg:py-5">
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

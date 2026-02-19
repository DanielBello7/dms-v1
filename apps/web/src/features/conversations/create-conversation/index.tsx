import { AddPeople } from "./add-people";
import { Members } from "./members";

export const CreateConversation = () => {
  return (
    <div className="w-full flex flex-col h-full lg:flex-row">
      <div className="w-full h-1/2 lg:h-full lg:w-6/12 lg:p-10 lg:border-r border-b lg:border-b-0">
        <Members />
      </div>
      <div className="w-full h-1/2 lg:h-full lg:w-6/12 lg:p-10">
        <AddPeople />
      </div>
    </div>
  );
};

// import { useAsyncHandler } from "@/hooks";
// import { useNewConvo } from "../new-convo.store";
// import { api } from "@/lib";
// import { useConversations, useUser } from "@/stores";
// import { useNavigate } from "react-router";
// import { wait } from "@repo/helpers";
// import { envs } from "@/config";
// import { z } from "zod";
// import { useForm } from "react-hook-form";

// const schema = z.object({
//   name: z.string().nonempty(),
// });

// type FORM_SCHEMA = z.infer<typeof schema>;

// export const useLogic = () => {
//   const new_convo = useNewConvo((state) => state);
//   const handler = useAsyncHandler();
//   const members = new_convo.data.members;
//   const user = useUser((state) => state);
//   const convo = useConversations((state) => state);
//   const navigate = useNavigate();
//   const form = useForm<FORM_SCHEMA>({
//     defaultValues: {
//       name: "",
//     },
//   });

//   const submit = () => {
//     return handler.run(async () => {
//       const parsed = schema.safeParse(form.getValues());
//       if (members.length < 1) {
//         throw new Error("Add at least one member to start a chat");
//       }
//       if (members.length > 1) {
//         throw new Error("Add a name for the group");
//       }
//       await wait(2000, envs.NODE_ENV);
//       const response = await api.conversations.insert_conversation({
//         created_by: user.data.user.ref_id,
//         last_message_id: undefined,
//         members: members.map((m) => m.ref_id),
//         name: members.length > 1 ? parsed.data?.name : undefined,
//       });
//       const get_convo = await api.conversations.find_conversation_by_ref(
//         response.ref_id,
//       );
//       convo.insert_conversations([get_convo]);
//       new_convo.reset();
//       navigate(`/dashboard/conversations/${get_convo.ref_id}`);
//     });
//   };

//   return {
//     submit,
//     handler,
//     new_convo,
//     members,
//     form,
//   };
// };

import { useAsyncHandler } from "@/hooks";
import { useNewConvo } from "../new-convo.store";
import { api } from "@/lib";
import { useConversations, useUser } from "@/stores";
import { useNavigate } from "react-router";
import { wait } from "@repo/helpers";
import { envs } from "@/config";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useConnection } from "@/features/socket/context/use-connection";

const schema = z.object({
  name: z.string().nonempty(),
});

type FORM_SCHEMA = z.infer<typeof schema>;

export const useLogic = () => {
  const new_convo = useNewConvo((state) => state);
  const handler = useAsyncHandler();
  const members = new_convo.data.members;
  const user = useUser((state) => state);
  const convo = useConversations((state) => state);
  const navigate = useNavigate();
  const form = useForm<FORM_SCHEMA>({
    defaultValues: {
      name: "",
    },
  });
  const conn = useConnection();

  const submit = () => {
    return handler.run(async () => {
      const parsed = schema.safeParse(form.getValues());
      if (members.length < 1) {
        throw new Error("Add at least one member to start a chat");
      }
      if (members.length > 1) {
        throw new Error("Add a name for the group");
      }
      await wait(2000, envs.NODE_ENV);
      const response = await conn.emit_con(
        {
          created_by: user.data.user.ref_id,
          last_message_id: undefined,
          members: members.map((m) => m.ref_id),
          name: members.length > 1 ? parsed.data?.name : undefined,
        },
        5000,
      );

      const get_convo = await api.conversations.find_conversation_by_ref(
        response.ref_id,
      );
      convo.insert_conversations([get_convo]);
      new_convo.reset();
      navigate(`/dashboard/conversations/${get_convo.ref_id}`);
    });
  };

  return {
    submit,
    handler,
    new_convo,
    members,
    form,
  };
};

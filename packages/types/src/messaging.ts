import { ICommon } from "./common";

export enum MESSAGE_TYPE_ENUM {
	IMAGE = "IMAGE",
	VIDEO = "VIDEO",
	DOCXS = "DOCXS",
}

export type IConversation = ICommon & {
	ongoing_participants: string[];
	members: string[];
	created_by: string;
	last_message_id: string | undefined;
};

export type IMessage = ICommon & {
	conversation_id: string;
	text: string;
	created_by: string;
	read_by: { id: string; read_at: Date }[];
	media: { type: MESSAGE_TYPE_ENUM; url: string; text?: string }[];
};

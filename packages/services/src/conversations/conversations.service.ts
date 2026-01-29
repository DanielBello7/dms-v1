import { ApiService } from "@/utils";
import { AxiosInstance } from "axios";
import {
	type IConversation,
	type IDatePaginated,
	type IMessage,
	type IPagePaginated,
	type IUser,
	BaseOmit,
} from "@repo/types";

export type IConversationPopulated = IConversation & {
	Participants: IUser[];
	LastMsg?: IMessage & {
		CreatedBy: IUser;
	};
};

export type IMessagePopulated = IMessage & {
	CreatedBy: IUser;
};

export enum SORT_TYPE {
	DESC = "DESC",
	ASC = "ASC",
}

export type ConversationQueryDto = {
	ref: string;
	page?: number;
	pick?: number;
	sort?: SORT_TYPE;
};

export type MessagesQueryDto = {
	from_date?: Date;
	pick?: number;
	sort?: SORT_TYPE;
};

export type InsertConversationDto = Omit<
	BaseOmit<IConversation>,
	"ref_id" | "ongoing_participants" | "index"
>;

export type JoinConversationDto = Pick<
	BaseOmit<IConversation>,
	"members" | "ref_id"
>;

export type ExitConversationDto = Pick<BaseOmit<IConversation>, "ref_id"> & {
	user_ref: string;
};

export type CreateMessageDto = Omit<BaseOmit<IMessage>, "index" | "ref_id">;

export class ConversationsService extends ApiService {
	constructor(baseURL?: string | AxiosInstance) {
		super(baseURL ? baseURL : "");
	}

	/**
	 * Inserts a new message into a conversation
	 * @param data - Message data including conversation_id, created_by, text, etc.
	 * @returns Created message data with populated CreatedBy relation
	 */
	insert_message = async (
		data: CreateMessageDto
	): Promise<IMessagePopulated> => {
		return (await this.post("conversations/message", data)).data;
	};

	/**
	 * Creates a new conversation
	 * @param data - Conversation data including created_by and members
	 * @returns Created conversation data
	 */
	insert_conversation = async (
		data: InsertConversationDto
	): Promise<IConversation> => {
		return (await this.post("conversations", data)).data;
	};

	/**
	 * Exits a conversation (removes user from ongoing participants)
	 * @param data - Exit data including ref_id and user_ref
	 * @returns Updated conversation data
	 */
	exit_conversation = async (
		data: ExitConversationDto
	): Promise<IConversation> => {
		return (await this.post("conversations/exit", data)).data;
	};

	/**
	 * Joins a conversation (adds members to the conversation)
	 * @param data - Join data including ref_id and members array
	 * @returns Updated conversation data
	 */
	join_conversation = async (
		data: JoinConversationDto
	): Promise<IConversation> => {
		return (await this.post("conversations/join", data)).data;
	};

	/**
	 * Gets paginated conversations for a user by their ref_id
	 * @param query - Query params: ref (user ref_id), page?, pick?, sort?
	 * @returns Paginated list of conversations with populated Participants
	 */
	get_user_conversations = async (
		query: ConversationQueryDto
	): Promise<IPagePaginated<IConversationPopulated>> => {
		return (await this.get("conversations/users", { params: query })).data;
	};

	/**
	 * Find paginated conversation by the ref_id
	 * @param ref - id params: ref (conversation ref_id)
	 * @returns Single conversation with populated Participants
	 */
	find_conversation_by_ref = async (
		ref: string
	): Promise<IConversationPopulated> => {
		return (await this.get(`conversations/${ref}`)).data;
	};

	/**
	 * Gets cursor-paginated messages for a conversation by ref_id
	 * @param ref - Conversation ref_id (UUID)
	 * @param query - Query params: from_date?, pick?, sort?
	 * @returns Date-paginated list of messages with populated CreatedBy
	 */
	get_conversation_messages = async (
		ref: string,
		query: MessagesQueryDto
	): Promise<IDatePaginated<IMessagePopulated>> => {
		return (await this.get(`conversations/${ref}/messages`, { params: query }))
			.data;
	};

	/**
	 * Deletes (soft-deletes) a conversation by ref_id
	 * @param ref - Conversation ref_id (UUID)
	 * @returns The removed conversation entity
	 */
	delete_conversation = async (ref: string): Promise<IConversation> => {
		return (await this.delete(`conversations/${ref}`)).data;
	};
}

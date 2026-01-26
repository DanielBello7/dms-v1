import { ApiService } from '@/utils';
import { AxiosInstance } from 'axios';
import { IConversation, IMessage, BaseOmit } from '@repo/types';

export type InsertConversationDto = Omit<
	BaseOmit<IConversation>,
	'ref_id' | 'ongoing_participants' | 'index'
>;

export type JoinConversationDto = Pick<BaseOmit<IConversation>, 'members' | 'ref_id'>;

export type ExitConversationDto = Pick<BaseOmit<IConversation>, 'ref_id'> & {
	user_ref: string;
};

export type CreateMessageDto = BaseOmit<IMessage>;

export class ConversationsService extends ApiService {
	constructor(baseURL?: string | AxiosInstance) {
		super(baseURL ? baseURL : '');
	}

	/**
	 * Inserts a new message into a conversation
	 * @param data - Message data including conversation_id, created_by, text, etc.
	 * @returns Created message data
	 */
	insert_message = async (data: CreateMessageDto): Promise<IMessage> => {
		return (await this.post('conversations/message', data)).data;
	};

	/**
	 * Creates a new conversation
	 * @param data - Conversation data including created_by and members
	 * @returns Created conversation data
	 */
	insert_conversation = async (
		data: InsertConversationDto,
	): Promise<IConversation> => {
		return (await this.post('conversations', data)).data;
	};

	/**
	 * Exits a conversation (removes user from ongoing participants)
	 * @param data - Exit data including ref_id and user_ref
	 * @returns Updated conversation data
	 */
	exit_conversation = async (
		data: ExitConversationDto,
	): Promise<IConversation> => {
		return (await this.post('conversations/exit', data)).data;
	};

	/**
	 * Joins a conversation (adds members to the conversation)
	 * @param data - Join data including ref_id and members array
	 * @returns Updated conversation data
	 */
	join_conversation = async (
		data: JoinConversationDto,
	): Promise<IConversation> => {
		return (await this.post('conversations/join', data)).data;
	};
}

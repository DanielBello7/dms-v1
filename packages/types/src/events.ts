import { IConversationSerialized, IMessageSerialized } from "./messaging";
import { IUserSerialized } from "./user";

export enum CONVERSATION_SOCKET_EVENTS {
	SEND_MESSAGE_TO_SERVER = "SEND_MESSAGE_TO_SERVER", // client emits data with this, server listens to this
	RECEIVE_MESSAGE_FROM_SERVER = "RECEIVE_MESSAGE_FROM_SERVER", // server emits data with this, client listens to this
	SEND_NEW_CONVERSATION_ALERT_TO_SERVER = "SEND_NEW_CONVERSATION_ALERT_TO_SERVER", // client emits data with this, server listens to this
	RECEIVE_NEW_CONVERSATION_ALERT_FROM_SERVER = "RECEIVE_NEW_CONVERSATION_ALERT_FROM_SERVER", // server emits data with this, client listens to this
}

/**
 * event emit from client to server
 *
 * the client sends a message of this object to the server
 * the server listens for messages from clients with this object
 * on the SEND_MESSAGE_TO_SERVER event
 */
export type SEND_MESSAGE_TO_SERVER_PARAMS = {
	msg: Pick<
		IMessageSerialized,
		"conversation_id" | "created_by" | "media" | "read_by" | "text"
	>;
};

/**
 * event emit from server to client
 *
 * the client receives this object from the server whenever
 * a message has been sent from another client to it through
 * the server
 *
 * on the RECEIVE_MESSAGE_FROM_SERVER event
 */
export type RECEIVE_NEW_MESSAGE_FROM_SERVER_PARAMS = {
	msg: IMessageSerialized & {
		CreatedBy: IUserSerialized;
	};
};

/**
 * event emit from client to server
 *
 * the client sends this object to the server whenever it
 * creates a new conversation
 *
 * the server gets this object from the client
 *
 * on SEND_NEW_CONVERSATION_ALERT_TO_SERVER event
 */
export type SEND_NEW_CONVERSATION_TO_SERVER_PARAMS = {
	convo: Pick<IConversationSerialized, "created_by" | "members" | "name">;
};

/**
 * event emit from server to client
 *
 * the client gets this object from the server as an event whenever
 * a server sends it to the client, this happens whenever another
 * client sends a conversation to it through the server
 *
 * the server emits this object to a client whenever a new conversation
 * has been forwarded to it by another client
 *
 * on the RECEIVE_NEW_CONVERSATION_ALERT_FROM_SERVER event
 */
export type RECEIVE_NEW_CONVERSATION_FROM_SERVER_PARAMS = {
	convo: IConversationSerialized;
};

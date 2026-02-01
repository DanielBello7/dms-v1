export enum CONVERSATION_SOCKET_EVENTS {
	SEND_MESSAGE_TO_SERVER = "SEND_MESSAGE_TO_SERVER", // client emits data with this, server listens to this
	RECEIVE_MESSAGE_FROM_SERVER = "RECEIVE_MESSAGE_FROM_SERVER", // server emits data with this, client listens to this
	SEND_NEW_CONVERSATION_ALERT_TO_SERVER = "SEND_NEW_CONVERSATION_ALERT_TO_SERVER", // client emits data with this, server listens to this
	RECEIVE_NEW_CONVERSATION_ALERT_FROM_SERVER = "RECEIVE_NEW_CONVERSATION_ALERT_FROM_SERVER", // server emits data with this, client listens to this
}

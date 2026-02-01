import { UnauthorizedException } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ConversationsService } from './conversations.service';
import { ValidUser } from '@/auth/types/auth.types';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@/users/users.service';
import {
  AccountType,
  CONVERSATION_SOCKET_EVENTS,
  RECEIVE_NEW_CONVERSATION_FROM_SERVER_PARAMS,
  RECEIVE_NEW_MESSAGE_FROM_SERVER_PARAMS,
  SEND_MESSAGE_TO_SERVER_PARAMS,
  SEND_NEW_CONVERSATION_TO_SERVER_PARAMS,
} from '@repo/types';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ConversationsGateway implements OnGatewayInit {
  constructor(
    private readonly conversation: ConversationsService,
    private readonly jwt: JwtService,
    private readonly users: UsersService,
  ) {}

  @WebSocketServer()
  private server: Server;

  afterInit(server: Server) {
    /** when a socket connects */
    server.use(async (socket, next) => {
      try {
        const { token, email } = socket.handshake.auth;

        if (!token || !email) {
          return next(new Error('Unauthorized'));
        }

        const payload: ValidUser = await this.jwt.verifyAsync(token);
        const user = await this.users.find_user_by_email(email);

        socket.data.user = user;
        socket.data.accountType = payload.type;

        if (payload.type === AccountType.Client) {
          socket.join(user.id);
        }

        next();
      } catch (err) {
        next(new Error('Unauthorized'));
      }
    });
  }

  @SubscribeMessage(CONVERSATION_SOCKET_EVENTS.SEND_MESSAGE_TO_SERVER)
  async handleMessage(
    @MessageBody() payload: SEND_MESSAGE_TO_SERVER_PARAMS,
    @ConnectedSocket() client: Socket,
  ) {
    const user = client.data.user;

    // Authorization check
    if (payload.msg.created_by !== user.id) {
      throw new UnauthorizedException();
    }

    const conversation = await this.conversation.find_conversation_by_id(
      payload.msg.conversation_id,
    );

    const response = await this.conversation.insert_message({
      conversation_id: payload.msg.conversation_id,
      created_by: payload.msg.created_by,
      media: payload.msg.media,
      read_by: payload.msg.read_by,
      text: payload.msg.text,
    });

    const people = conversation.ongoing_participants.filter((i) => {
      return i !== response.created_by;
    });

    for (const member of people) {
      this.server
        .to(member)
        .emit(CONVERSATION_SOCKET_EVENTS.RECEIVE_MESSAGE_FROM_SERVER, {
          msg: response,
        } as RECEIVE_NEW_MESSAGE_FROM_SERVER_PARAMS);
    }

    return response;
  }

  @SubscribeMessage(
    CONVERSATION_SOCKET_EVENTS.SEND_NEW_CONVERSATION_ALERT_TO_SERVER,
  )
  async handleConversation(
    @MessageBody() payload: SEND_NEW_CONVERSATION_TO_SERVER_PARAMS,
    @ConnectedSocket() _client: Socket,
  ) {
    const response = await this.conversation.insert_conversation({
      created_by: payload.convo.created_by,
      members: payload.convo.members,
      name: payload.convo.name,
    });

    const people = response.ongoing_participants.filter((i) => {
      return i !== response.created_by;
    });

    for (const member of people) {
      this.server
        .to(member)
        .emit(
          CONVERSATION_SOCKET_EVENTS.RECEIVE_NEW_CONVERSATION_ALERT_FROM_SERVER,
          {
            convo: response,
          } as RECEIVE_NEW_CONVERSATION_FROM_SERVER_PARAMS,
        );
    }

    return response;
  }
}

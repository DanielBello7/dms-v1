import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { ConversationSchema } from './schemas/conversation.schema';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageSchema } from './schemas/message.schema';
import { MutationsService } from '@app/mutations';
import { CreateConversationDto } from './dto/create-conversation.dto';
import {
  create_helper,
  find_by_id_lock_helper,
  isValidDto,
  update_by_id_helper,
} from '@app/util';
import { InsertConversationDto } from './dto/insert-conversation.dto';
import { UsersService } from '@/users/users.service';
import { v4 as uuid } from 'uuid';
import { JoinConversationDto } from './dto/join-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { ExitConversationDto } from './dto/leave-conversation.dto';
import { CreateMessageDto } from './dto/messages/create-message.dto';

@Injectable()
export class ConversationsService {
  constructor(
    private readonly mutations: MutationsService,
    private readonly users: UsersService,
    @InjectRepository(ConversationSchema)
    private readonly conversations: Repository<ConversationSchema>,
    @InjectRepository(MessageSchema)
    private readonly messages: Repository<MessageSchema>,
  ) {}

  insert_message = async (body: CreateMessageDto) => {
    const errors = isValidDto(body, CreateMessageDto);
    if (errors.length > 0) throw new BadRequestException(errors);

    return this.mutations.execute(async (session) => {
      const conversaion = await this.find_by_ref_lock(
        body.conversation_id,
        session,
      ); // conversation_id -> conversation_ref
      const user = await this.users.find_by_ref_id_lock(
        body.created_by,
        session,
      );
      const new_message = await this.create_message(
        {
          conversation_id: conversaion.id,
          created_by: user.id,
          text: body.text,
          ref_id: uuid(),
          read_by: [{ id: user.id, read_at: new Date() }],
          media: [],
          index: 0,
        },
        session,
      );
      return new_message;
    });
  };

  create_message = async (body: CreateMessageDto, session?: EntityManager) => {
    const errors = isValidDto(body, CreateMessageDto);
    if (errors.length > 0) throw new BadRequestException(errors);
    return create_helper<MessageSchema>(this.messages, body, session);
  };

  insert_conversation = async (body: InsertConversationDto) => {
    const errors = isValidDto(body, InsertConversationDto);
    if (errors.length > 0) throw new BadRequestException(errors);

    return this.mutations.execute(async (session) => {
      const user = await this.users.find_by_ref_id_lock(
        body.created_by,
        session,
      );

      const members = await this.users.find_by_ref_ids_lock(
        body.members,
        session,
      );

      const ids = members.map((m) => m.id);
      const ref = uuid();

      return this.create_conversation(
        {
          created_by: user.id,
          members: ids,
          ongoing_participants: ids,
          ref_id: ref,
          index: 0,
        },
        session,
      );
    });
  };

  exit_conversation_by_ref = async (body: ExitConversationDto) => {
    const errors = isValidDto(body, ExitConversationDto);
    if (errors.length > 0) throw new BadRequestException(errors);

    return this.mutations.execute(async (session) => {
      const conversation = await this.find_by_ref_lock(body.ref_id, session);
      const user = await this.users.find_by_ref_id_lock(body.user_ref, session);
      const updates = conversation.ongoing_participants.filter(
        (i) => i === user.id,
      );
      return this.update_conversation(
        conversation.id,
        {
          ongoing_participants: updates,
        },
        session,
      );
    });
  };

  find_by_ref_lock = async (ref: string, session: EntityManager) => {
    const db = this.mutations.getRepo(this.conversations, session);
    const response = await db.findOne({
      where: { ref_id: ref },
      lock: { mode: 'pessimistic_write' },
    });
    if (response) return response;
    throw new NotFoundException('cannot find conversation');
  };

  join_conversation_by_ref_id = async (body: JoinConversationDto) => {
    const errors = isValidDto(body, JoinConversationDto);
    if (errors.length > 0) throw new BadRequestException(errors);

    return this.mutations.execute(async (session) => {
      const conversation = await this.find_by_ref_lock(body.ref_id, session);

      const members_to_add = await this.users.find_by_ref_ids_lock(
        body.members,
        session,
      );

      if (!conversation) {
        throw new NotFoundException("didn't find conversation");
      }

      const to_insert = members_to_add
        .map((m) => m.id)
        .filter((m) => !conversation.members.includes(m));

      const updates = [...conversation.members, ...to_insert];

      return this.update_conversation(
        conversation.id,
        {
          members: updates,
          ongoing_participants: updates,
        },
        session,
      );
    });
  };

  find_by_id_lock = async (id: string, session: EntityManager) => {
    return find_by_id_lock_helper(this.conversations, id, session);
  };

  create_conversation = async (
    body: CreateConversationDto,
    session?: EntityManager,
  ) => {
    const errors = isValidDto(body, CreateConversationDto);
    if (errors.length > 0) throw new BadRequestException(errors);
    return create_helper<ConversationSchema>(this.conversations, body, session);
  };

  update_conversation = async (
    id: string,
    body: UpdateConversationDto,
    session?: EntityManager,
  ) => {
    const errors = isValidDto(body, UpdateConversationDto);
    if (errors.length > 0) throw new BadRequestException(errors);
    return update_by_id_helper(this.conversations, id, body, session);
  };
}

import { CommonBase } from '@app/util';
import { Column, Entity } from 'typeorm';
import { MessageEntity } from '@/conversations/entities/message.entity';
import { MESSAGE_TYPE_ENUM } from '@repo/types';

@Entity('messages')
export class MessageSchema extends CommonBase implements MessageEntity {
  @Column({ type: 'jsonb' }) media: {
    type: MESSAGE_TYPE_ENUM;
    url: string;
    text?: string;
  }[];
  @Column({ type: 'uuid' }) conversation_id: string;
  @Column({ type: 'varchar' }) text: string;
  @Column({ type: 'uuid' }) created_by: string;
  @Column({ type: 'jsonb' }) read_by: { id: string; read_at: Date }[];
}

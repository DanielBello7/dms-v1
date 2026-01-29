import { ConversationEntity } from '@/conversations/entities/conversation.entity';
import { CommonBase } from '@app/util';
import { Column, Entity, JoinColumn, OneToOne, Relation } from 'typeorm';
import { MessageSchema } from './message.schema';

@Entity('conversation')
export class ConversationSchema
  extends CommonBase
  implements ConversationEntity
{
  @Column({ type: 'varchar', array: true }) ongoing_participants: string[];
  @Column({ type: 'varchar', array: true }) members: string[];
  @Column({ type: 'uuid' }) created_by: string;
  @Column({ type: 'uuid', nullable: true }) last_message_id: string | undefined;

  @OneToOne(() => MessageSchema, { nullable: true })
  @JoinColumn({ name: 'last_message_id' })
  LastMsg: Relation<MessageSchema | undefined>;
}

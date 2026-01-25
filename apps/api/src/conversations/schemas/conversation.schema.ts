import { ConversationEntity } from '@/conversations/entities/conversation.entity';
import { CommonBase } from '@app/util';
import { Column, Entity } from 'typeorm';

@Entity('conversation')
export class ConversationSchema
  extends CommonBase
  implements ConversationEntity
{
  @Column({ type: 'varchar', array: true }) ongoing_participants: string[];
  @Column({ type: 'varchar', array: true }) members: string[];
  @Column({ type: 'uuid', unique: true }) ref_id: string;
  @Column({ type: 'uuid' }) created_by: string;
}

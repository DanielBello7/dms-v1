import { IConversation } from '@repo/types';

export class ConversationEntity implements IConversation {
  id: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | undefined;
  ongoing_participants: string[];
  members: string[];
  ref_id: string;
  created_by: string;
  index: number;
  last_message_id: string | undefined;
}

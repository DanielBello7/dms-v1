import { IMessage, MESSAGE_TYPE_ENUM } from '@repo/types';

export class MessageEntity implements IMessage {
  media: { type: MESSAGE_TYPE_ENUM; url: string; text?: string }[];
  id: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | undefined;
  conversation_id: string;
  text: string;
  created_by: string;
  ref_id: string;
  read_by: { id: string; read_at: Date }[];
}

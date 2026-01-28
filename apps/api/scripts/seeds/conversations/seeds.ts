import { IConversation } from '@repo/types';
import { v4 as uuid } from 'uuid';
import { data as users } from '../users/seeds';

const now = new Date();

// Conversation 1: Between Goke and Alice
export const conversation1: IConversation = {
  id: uuid(),
  ref_id: uuid(),
  index: 0,
  created_at: now,
  updated_at: now,
  deleted_at: undefined,
  created_by: users[0].id, // Goke
  members: [users[0].id, users[1].id], // Goke and Alice
  ongoing_participants: [users[0].id, users[1].id], // Both active
  last_message_id: undefined, // Will be populated after messages are created
};

// Conversation 2: Between Alice and Bob
export const conversation2: IConversation = {
  id: uuid(),
  ref_id: uuid(),
  index: 0,
  created_at: now,
  updated_at: now,
  deleted_at: undefined,
  created_by: users[1].id, // Alice
  members: [users[1].id, users[2].id], // Alice and Bob
  ongoing_participants: [users[1].id, users[2].id], // Both active
  last_message_id: undefined, // Will be populated after messages are created
};

export const data: IConversation[] = [conversation1, conversation2];

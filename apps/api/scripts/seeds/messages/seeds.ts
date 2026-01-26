import { IMessage } from '@repo/types';
import { v4 as uuid } from 'uuid';
import { conversation1, conversation2 } from '../conversations/seeds';
import { data as users } from '../users/seeds';

const now = new Date();

// Helper to create a message
const createMessage = (
  conversationId: string,
  createdBy: string,
  text: string,
  readBy: string[] = [],
): IMessage => ({
  id: uuid(),
  ref_id: uuid(),
  index: 0,
  created_at: new Date(now.getTime() + Math.random() * 1000000), // Random time for variety
  updated_at: new Date(),
  deleted_at: undefined,
  conversation_id: conversationId,
  created_by: createdBy,
  text,
  read_by: readBy.map((userId) => ({
    id: userId,
    read_at: new Date(),
  })),
  media: [],
});

// Conversation 1 messages (Goke and Alice)
const conversation1Messages: IMessage[] = [
  createMessage(
    conversation1.id,
    users[0].id, // Goke
    "Hey Alice! How's it going?",
    [users[0].id, users[1].id],
  ),
  createMessage(
    conversation1.id,
    users[1].id, // Alice
    "Hi Goke! I'm doing great, thanks for asking. How about you?",
    [users[0].id, users[1].id],
  ),
  createMessage(
    conversation1.id,
    users[0].id, // Goke
    "I'm doing well too! Just working on some projects. Want to grab coffee this weekend?",
    [users[0].id, users[1].id],
  ),
  createMessage(
    conversation1.id,
    users[1].id, // Alice
    'That sounds great! Saturday works for me. What time?',
    [users[0].id, users[1].id],
  ),
  createMessage(
    conversation1.id,
    users[0].id, // Goke
    'How about 10 AM at the downtown cafe?',
    [users[0].id, users[1].id],
  ),
  createMessage(
    conversation1.id,
    users[1].id, // Alice
    'Perfect! See you there!',
    [users[0].id, users[1].id],
  ),
];

// Conversation 2 messages (Alice and Bob)
const conversation2Messages: IMessage[] = [
  createMessage(
    conversation2.id,
    users[1].id, // Alice
    'Hey Bob! Are you free for a quick call?',
    [users[1].id, users[2].id],
  ),
  createMessage(
    conversation2.id,
    users[2].id, // Bob
    "Hi Alice! Yes, I'm free. What's up?",
    [users[1].id, users[2].id],
  ),
  createMessage(
    conversation2.id,
    users[1].id, // Alice
    'I wanted to discuss the project timeline. Can we schedule a meeting?',
    [users[1].id, users[2].id],
  ),
  createMessage(
    conversation2.id,
    users[2].id, // Bob
    'Absolutely! How about tomorrow at 2 PM?',
    [users[1].id, users[2].id],
  ),
  createMessage(
    conversation2.id,
    users[1].id, // Alice
    "That works for me! I'll send you a calendar invite.",
    [users[1].id, users[2].id],
  ),
  createMessage(
    conversation2.id,
    users[2].id, // Bob
    'Great! Looking forward to it.',
    [users[1].id, users[2].id],
  ),
];

export const data: IMessage[] = [
  ...conversation1Messages,
  ...conversation2Messages,
];

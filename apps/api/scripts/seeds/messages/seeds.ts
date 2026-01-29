import { IMessage } from '@repo/types';
import { v4 as uuid } from 'uuid';
import { conversation1, conversation2 } from '../conversations/seeds';
import { data as users } from '../users/seeds';
import { addSeconds } from 'date-fns';

const now = new Date();

// Helper to create a message
const createMessage = (
  conversationId: string,
  createdBy: string,
  text: string,
  readBy: string[] = [],
  index: number,
): IMessage => ({
  id: uuid(),
  ref_id: uuid(),
  index,
  created_at: addSeconds(now, index * 10),
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
    0,
  ),
  createMessage(
    conversation1.id,
    users[1].id, // Alice
    "Hi Goke! I'm doing great, thanks for asking. How about you?",
    [users[0].id, users[1].id],
    1,
  ),
  createMessage(
    conversation1.id,
    users[0].id, // Goke
    "I'm doing well too! Just working on some projects. Want to grab coffee this weekend?",
    [users[0].id, users[1].id],
    2,
  ),
  createMessage(
    conversation1.id,
    users[1].id, // Alice
    'That sounds great! Saturday works for me. What time?',
    [users[0].id, users[1].id],
    3,
  ),
  createMessage(
    conversation1.id,
    users[0].id, // Goke
    'How about 10 AM at the downtown cafe?',
    [users[0].id, users[1].id],
    4,
  ),
  createMessage(
    conversation1.id,
    users[1].id, // Alice
    'Perfect! See you there!',
    [users[0].id, users[1].id],
    5,
  ),
];

// Conversation 2 messages (Alice and Bob)
const conversation2Messages: IMessage[] = [
  createMessage(
    conversation2.id,
    users[1].id, // Alice
    'Hey Bob! Are you free for a quick call?',
    [users[1].id, users[2].id],
    6,
  ),
  createMessage(
    conversation2.id,
    users[2].id, // Bob
    "Hi Alice! Yes, I'm free. What's up?",
    [users[1].id, users[2].id],
    7,
  ),
  createMessage(
    conversation2.id,
    users[1].id, // Alice
    'I wanted to discuss the project timeline. Can we schedule a meeting?',
    [users[1].id, users[2].id],
    8,
  ),
  createMessage(
    conversation2.id,
    users[2].id, // Bob
    'Absolutely! How about tomorrow at 2 PM?',
    [users[1].id, users[2].id],
    9,
  ),
  createMessage(
    conversation2.id,
    users[1].id, // Alice
    "That works for me! I'll send you a calendar invite.",
    [users[1].id, users[2].id],
    10,
  ),
  createMessage(
    conversation2.id,
    users[2].id, // Bob
    'Great! Looking forward to it.',
    [users[1].id, users[2].id],
    11,
  ),
];

export const data: IMessage[] = [
  ...conversation1Messages,
  ...conversation2Messages,
];

import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { ConversationSchema } from '@/conversations/schemas/conversation.schema';
import { data as conversations } from './seeds';
import { data as messages } from '../messages/seeds';

class UpdateConversationLastMessageSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const conversation_repo = dataSource.getRepository(ConversationSchema);

    let updated_count = 0;

    for (const conversation of conversations) {
      const conversationMessages = messages.filter(
        (msg) => msg.conversation_id === conversation.id,
      );

      if (conversationMessages.length > 0) {
        const lastMessage = conversationMessages.sort(
          (a, b) => b.created_at.getTime() - a.created_at.getTime(),
        )[0];

        await conversation_repo.update(
          { id: conversation.id },
          { last_message_id: lastMessage.id },
        );
        updated_count++;
        console.log(
          `Updated conversation ${conversation.id} with last_message_id: ${lastMessage.id}`,
        );
      }
    }

    console.log(
      `Finished updating ${updated_count} out of ${conversations.length} conversations with last_message_id`,
    );
  }
}

export { UpdateConversationLastMessageSeeder };

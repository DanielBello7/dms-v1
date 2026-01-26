import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { data } from './seeds';
import { ConversationSchema } from '@/conversations/schemas/conversation.schema';

class ConversationSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const conversation_repo = dataSource.getRepository(ConversationSchema);

    let insert_count = 0;
    let skippd_count = 0;

    for (const convo of data) {
      const exists = await conversation_repo.findOneBy({
        id: convo.id,
      });
      if (exists) {
        skippd_count++;
        continue;
      }

      await conversation_repo.save(convo);
      insert_count++;
    }

    console.log(
      `Total ${data.length}, seeded ${insert_count} conversation (skipped ${skippd_count} existing).`,
    );
  }
}

export { ConversationSeeder };

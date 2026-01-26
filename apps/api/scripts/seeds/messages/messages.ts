import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { data } from './seeds';
import { MessageSchema } from '@/conversations/schemas/message.schema';

class MessageSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const message_repo = dataSource.getRepository(MessageSchema);

    let insert_count = 0;
    let skippd_count = 0;

    for (const msg of data) {
      const exists = await message_repo.findOneBy({
        id: msg.id,
      });
      if (exists) {
        skippd_count++;
        continue;
      }

      await message_repo.save(msg);
      insert_count++;
    }

    console.log(
      `Total ${data.length}, seeded ${insert_count} messages (skipped ${skippd_count} existing).`,
    );
  }
}

export { MessageSeeder };

import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { data } from './seeds';
import { UserSchema } from '@/users/schemas/user.schema';

class UserSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const user_repo = dataSource.getRepository(UserSchema);

    let insert_count = 0;
    let skippd_count = 0;

    for (const user of data) {
      const exists = await user_repo.findOneBy({
        id: user.id,
      });
      if (exists) {
        skippd_count++;
        continue;
      }

      await user_repo.save(user);
      insert_count++;
    }

    console.log(
      `Total ${data.length}, seeded ${insert_count} users (skipped ${skippd_count} existing).`,
    );
  }
}

export { UserSeeder };

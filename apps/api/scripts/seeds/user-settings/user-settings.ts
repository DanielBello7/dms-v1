import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { data } from './seeds';
import { UserSettingsSchema } from '@/users/schemas/user-settings.schema';

class UserSettingSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const user_settings_repo = dataSource.getRepository(UserSettingsSchema);

    let insert_count = 0;
    let skippd_count = 0;

    for (const settings of data) {
      const exists = await user_settings_repo.findOneBy({
        id: settings.id,
      });
      if (exists) {
        skippd_count++;
        continue;
      }

      await user_settings_repo.save(settings);
      insert_count++;
    }

    console.log(
      `Total ${data.length}, seeded ${insert_count} user settings (skipped ${skippd_count} existing).`,
    );
  }
}

export { UserSettingSeeder };

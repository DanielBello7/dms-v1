import { ConversationSeeder } from './seeds/conversations/conversation';
import { MessageSeeder } from './seeds/messages/messages';
import { UserSettingSeeder } from './seeds/user-settings/user-settings';
import { UserSeeder } from './seeds/users/users';
import { runSeeder } from 'typeorm-extension';
import datasource from './datasource';

void (async () => {
  await datasource.initialize();

  await runSeeder(datasource, UserSeeder);
  await runSeeder(datasource, UserSettingSeeder);
  await runSeeder(datasource, ConversationSeeder);
  await runSeeder(datasource, MessageSeeder);

  await datasource.destroy();
})().catch(console.error);

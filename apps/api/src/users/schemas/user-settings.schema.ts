import { Column, Entity } from 'typeorm';
import { CommonBase } from '@app/util';
import { UserSettingsEntity } from '@/users/entities/user-settings.entity';
import { Exclude } from 'class-transformer';

// prettier-ignore
@Entity("user_settings")
export class UserSettingsSchema extends CommonBase implements UserSettingsEntity {
  @Column({ type: "uuid", unique: true}) user_id: string;
  @Column({ type: 'boolean' }) is_onboarded: boolean;
  @Exclude()
  @Column({ type: 'varchar', nullable: true }) refresh_token: string | undefined;
  @Column({ type: 'timestamp', nullable: true }) last_login_date: Date | undefined;
  @Column({ type: 'boolean' }) dark_mode: boolean;
}

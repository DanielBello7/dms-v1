import { Column, Entity } from 'typeorm';
import { UserEntity } from '@/users/entities/user.entity';
import { CommonBase } from '@app/util';
import { AccountType } from '@repo/types';

@Entity('users')
export class UserSchema extends CommonBase implements UserEntity {
  @Column({ type: 'varchar' }) firstname: string;
  @Column({ type: 'varchar' }) surname: string;
  @Column({ type: 'varchar', unique: true }) email: string;
  @Column({ type: 'varchar', nullable: true }) password: string | undefined;
  @Column({ type: 'varchar', nullable: true }) avatar: string | undefined;
  @Column({ type: 'varchar' }) timezone: string;
  @Column({ type: 'varchar', unique: true }) username: string;
  @Column({ type: 'varchar' }) display_name: string;
  @Column({ type: 'enum', enum: AccountType }) type: AccountType;
  @Column({ type: 'boolean', default: false }) is_email_verified: boolean;
}

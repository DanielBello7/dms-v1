import { ICommon } from '@repo/types';
import {
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class CommonBase implements ICommon {
  @PrimaryGeneratedColumn('uuid') id: string;
  @CreateDateColumn({ type: 'timestamp' }) created_at: Date;
  @UpdateDateColumn({ type: 'timestamp' }) updated_at: Date;
  @DeleteDateColumn({ type: 'timestamp', nullable: true }) deleted_at:
    | Date
    | undefined;

  @BeforeUpdate()
  update() {
    this.updated_at = new Date();
  }

  @BeforeInsert()
  insert() {
    const now = new Date();
    this.updated_at = now;
    this.created_at = now;
  }
}

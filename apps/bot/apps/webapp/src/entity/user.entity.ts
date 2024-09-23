import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from './task.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  username: string;

  @Column()
  language_code: string;

  @Column({ type: 'date', default: () => `DATE('now')` })
  created_at: Date;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}

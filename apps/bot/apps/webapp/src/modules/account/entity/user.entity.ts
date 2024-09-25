import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from '../../task/entity/task.entity';
import { Category } from '../../category/entity/category.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  telegram_id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  username: string;

  @Column()
  language_code: string;

  @Column({ type: 'timestamptz', default: () => `now()` })
  created_at: Date;

  @OneToMany(() => Task, (task: Task) => task.user)
  tasks: Task[];

  @OneToMany(() => Category, (category: Category) => category.user)
  categories: Category[];
}

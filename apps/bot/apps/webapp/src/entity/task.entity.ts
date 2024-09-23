import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { User } from './user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  period: string;

  @Column({ type: 'json', nullable: true })
  cron_period: { day: number; month: number; weekday: number };

  @ManyToOne(() => Category, (category) => category.tasks)
  @JoinColumn({
    name: 'category_id',
    referencedColumnName: 'id',
  })
  category: Category;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user: User;
}

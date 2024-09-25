import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../../category/entity/category.entity';
import { User } from '../../account/entity/user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  period: string;

  @Column({ type: 'jsonb', nullable: true })
  cron_period: { day: number; month: number; weekday: number };

  @ManyToOne(() => Category, (category: Category) => category.tasks)
  @JoinColumn({
    name: 'category_id',
    referencedColumnName: 'id',
  })
  category: Category;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'date', nullable: true })
  date: Date;

  @Column({ type: 'date' })
  date_start: Date;

  @Column({ type: 'date' })
  date_end: Date;

  @Column({ type: 'integer' })
  duration: number;

  @Column({ type: 'timestamptz' })
  deadline: Date;

  @ManyToOne(() => User, (user: User) => user.tasks)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user: User;

  @Column({ nullable: true })
  status: string;

  @Column({ type: 'boolean', nullable: true, default: 'false' })
  is_notified: boolean;
}

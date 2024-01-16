import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Comments } from './Comments';

@Entity({ name: 'discussions' })
export class Discussions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  createdAt: Date;

  @OneToMany(() => Comments, (comment) => comment.discussion)
  comments: Comments[];

  @Column()
  userId: number;
}

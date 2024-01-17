import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Discussions } from './Discussion';
import { Comments } from './Comments';

@Entity({ name: 'upvote' })
export class Upvote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => Discussions, (discussion) => discussion.upvotes)
  discussion: Discussions;

  @ManyToOne(() => Comments, (comments) => comments.upvotes)
  comment: Comments;

  @Column()
  createdAt: Date;
}

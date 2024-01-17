import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Discussions } from './Discussion';
import { Upvote } from './Upvote';

@Entity({ name: 'comments' })
export class Comments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => Discussions, (discussion) => discussion.comments)
  discussion: Discussions;

  @ManyToOne(() => Comments, (comment) => comment.childComments, {
    nullable: true,
  })
  @JoinColumn({ name: 'parentCommentID' })
  parentComment: Comments;

  @OneToMany(() => Comments, (comment) => comment.parentComment)
  childComments: Comments[];

  @OneToMany(() => Upvote, (upvote) => upvote.comment)
  upvotes: Upvote[];

  @Column()
  userId: number;
}

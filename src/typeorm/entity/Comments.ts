import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Discussions } from './Discussion';

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
}

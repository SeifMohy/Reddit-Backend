import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
} from "typeorm";
import { User } from "./user";
import { Comment } from "./comment";
import { Tag } from "./tag"

@Entity("Posts_Table")
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  body: string;

  @Column({nullable: true})
  likes: [];

  @CreateDateColumn({nullable: true})
  date: Date;

  @ManyToOne(() => User, (user) => user.posts, {nullable:false})
  user: User;

  @OneToMany(() => Comment, (comments) => comments.post)
  comments: Comment[];

  @ManyToMany(()=> Tag, tag=> tag.posts)
  tags: Tag[];

}

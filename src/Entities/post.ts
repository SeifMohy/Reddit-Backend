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
import { Likes } from "./likes";

@Entity("Posts_Table")
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  body: string;

  @CreateDateColumn({nullable: true})
  date: Date;

  @ManyToOne(() => User, (user) => user.posts, {nullable:false})
  user: User;

  @OneToMany(() => Comment, (comments) => comments.post)
  comments: Comment[];

  @OneToMany(() => Likes, (likes) => likes.post)
  likes: Likes[];

  @ManyToMany(()=> Tag, tag=> tag.posts)
  tags: Tag[];

}

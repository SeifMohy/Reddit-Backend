import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Post } from "./post";

@Entity("Tags_Table")
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tagName: string;

  @ManyToMany(()=> Post, post => post.tags)
  @JoinTable()
  posts: Post[];
}

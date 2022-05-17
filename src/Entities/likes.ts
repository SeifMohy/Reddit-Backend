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
  import { Post } from "./post";
  
  @Entity("Likes_Table")
  export class Likes extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    value: boolean;

    @ManyToOne(() => User, (user) => user.likes,{nullable:false})
    user: User;

    @ManyToOne(() => Post, (post) => post.likes,{nullable:false})
    post: Post;
  }
  
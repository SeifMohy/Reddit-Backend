import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm"
import {Comment} from "./comment"
import {Post} from "./post"


@Entity("User_Table")
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column({nullable: true})
    imgUrl: string

    @OneToMany(() => Comment, (comment) => comment.user)
    comments: Comment[];

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[];
  
}


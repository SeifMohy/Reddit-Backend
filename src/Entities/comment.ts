import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, CreateDateColumn } from "typeorm"
import {User} from "./user"
import {Post} from "./post"

@Entity("Comments_Table")
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: true})
    title: string

    @Column()
    comment: string

    @CreateDateColumn({nullable: true})
    date: Date;

    @ManyToOne(() => User, (user) => user.comments,{nullable:false})
    user: User;

    @ManyToOne(() => Post, (post) => post.comments,{nullable:false})
    post: Post;

}
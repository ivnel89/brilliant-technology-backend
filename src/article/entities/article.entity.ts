import { Comment } from "src/comment/entities/comment.entity";
import { User } from "src/user/entities/user.entity";
import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, DeleteDateColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Article {
    constructor(
        author: User,
        content: string
        ){  
        this.content = content;
        this.author = author;
    }
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    content: string;

    @ManyToOne(() => User, user => user.comments, {eager: true})
    author: User

    @UpdateDateColumn()
    lastModifiedDate: Date;
  
    @CreateDateColumn()
    createdDate: Date;
  
    @DeleteDateColumn()
    deletedDate: Date;

    @OneToMany(() => Comment, comment => comment.parentArticle, {eager: true})
    comments: Array<Comment>
}
import { Article } from 'src/article/entities/article.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, DeleteDateColumn, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class Comment {
    constructor(
        author: User,
        article: Article,
        content: string
        ){  
        this.content = content;
        this.parentArticle = article;
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

    @ManyToOne(() => Article, article => article.comments)
    parentArticle: Article

    @ManyToMany(() => User, {eager: true})
    @JoinTable()
    upVoters: Array<User>
    //reported, nsfw
}

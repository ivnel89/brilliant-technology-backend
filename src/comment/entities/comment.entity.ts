import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, DeleteDateColumn, ManyToOne } from 'typeorm';

@Entity()
export class Comment {
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

    //reported, nsfw
}

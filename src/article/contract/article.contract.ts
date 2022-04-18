import { CommentContract } from "src/comment/contract/comment.contract";
import { CommentContractMapper } from "src/comment/mapper/comment.mapper";
import { UserContract } from "src/user/contract/user.contract";
import { UserContractMapper } from "src/user/mapper/user.mapper";
import { Article } from "../entities/article.entity";

export class ArticleContract {
    constructor(
        article: Article,
        requesterId?: string
    ){
        const userContractMapper = new UserContractMapper()
        const commentContractMapper = new CommentContractMapper()
        this.id = article.id;
        this.content = article.content;
        this.author = userContractMapper.build(article.author);
        this.createdDate = article.createdDate;
        this.comments = commentContractMapper.buildArray(
          article.comments,
          requesterId,
        );
    }
    id: string;
    content: string;
    author: UserContract;
    createdDate: Date;
    comments: Array<CommentContract>
}
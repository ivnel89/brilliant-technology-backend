import { CommentContract } from "../contract/comment.contract";
import { Comment } from "../entities/comment.entity"

export class CommentContractMapper {
  build(comment: Comment, requesterId?: string): CommentContract {
    return new CommentContract(comment, requesterId);
  }
  buildArray(comments: Array<Comment>, requesterId?: string): Array<CommentContract> {
    if(!comments){
      return [];
    }
    return comments.map((comment) => this.build(comment, requesterId));
  }
}
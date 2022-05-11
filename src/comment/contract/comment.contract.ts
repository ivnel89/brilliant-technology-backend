import { UserContract } from "src/user/contract/user.contract";
import { UserContractMapper } from "src/user/mapper/user.mapper";
import { Comment } from "../entities/comment.entity";

export class CommentContract {
    constructor(
        comment: Comment, 
        requesterId?: string
        ){
          const userContractMapper = new UserContractMapper();
          this.id = comment.id;
          this.content = comment.content;
          this.createdDate = comment.createdDate;
          this.author = userContractMapper.build(comment.author);
          if (comment.upVoters) {
            this.upVotes = comment.upVoters.length;
          }
          if (requesterId) {
            this.upVoted = comment.upVoters?.find(
              (upVoter) => upVoter.id === requesterId,
            )
              ? true
              : false;
          }
          this.replies = comment.children?.reverse()?.map(
            (child) => new CommentContract(child, requesterId),
          ) || [];
        }
    id: string;
    content: string;
    author: UserContract;
    createdDate: Date;
    upVotes: number;
    upVoted: boolean;
    replies: Array<CommentContract>
}
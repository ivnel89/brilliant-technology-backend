import { CreateCommentDto } from "../dto/create-comment.dto";
import { UpVoteCommentDto } from "../dto/up-vote-comment.dto";

const createCommentDto = new CreateCommentDto();
createCommentDto.articleId = "articleId";
createCommentDto.authorId = "authorId";
createCommentDto.content = "comment content";

const upVoteCommentDto = new UpVoteCommentDto();
upVoteCommentDto.userId = "userId";

const mockCommentId = "mockCommentId";

export{
    createCommentDto,
    mockCommentId,
    upVoteCommentDto
}
import { CreateArticleDto } from "../dto/create-article.dto";
import { FindAllArticleDto } from "../dto/find-all-article.dto";

const createArticleDto = new CreateArticleDto();
createArticleDto.authorId = "authorId";
createArticleDto.content = "Foo Bar";

const findAllArticleDto = new FindAllArticleDto();
findAllArticleDto.limit = 50;
findAllArticleDto.offset = 10;
findAllArticleDto.requesterId = "requesterId";

const mockArticleId = "mockArticleId";

export{
    createArticleDto,
    findAllArticleDto,
    mockArticleId,
}
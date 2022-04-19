import { CreateArticleDto } from "../dto/create-article.dto";
import { FindAllArticleDto } from "../dto/find-all-article.dto";
import { FindOneArticleDto } from "../dto/find-one-article.dto";

const createArticleDto = new CreateArticleDto();
createArticleDto.authorId = "authorId";
createArticleDto.content = "Foo Bar";

const findAllArticleDto = new FindAllArticleDto();
findAllArticleDto.limit = 50;
findAllArticleDto.offset = 10;
findAllArticleDto.requesterId = "requesterId";

const mockArticleId = "mockArticleId";

const findOneArticleDto = new FindOneArticleDto();
findAllArticleDto.requesterId = "requesterId";

export{
    createArticleDto,
    findAllArticleDto,
    mockArticleId,
    findOneArticleDto
}
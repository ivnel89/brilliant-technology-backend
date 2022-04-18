import { ArticleContract } from "../contract/article.contract";
import { Article } from "../entities/article.entity"

export class ArticleContractMapper {
  build(article: Article, requesterId?: string): ArticleContract {
    return new ArticleContract(article, requesterId);
  }
  buildArray(articles: Array<Article>, requesterId?: string): Array<ArticleContract> {
    return articles.map((article) => this.build(article, requesterId));
  }
}
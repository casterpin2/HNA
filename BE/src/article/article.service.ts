import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IdDto } from 'src/common/dto/id.dto';
import { UpdateBannerDisplayOrderDto } from 'src/content/banner/banner.controller';
import { BannerPosition } from 'src/content/entity/banner-enum.entity';
import {
  FindManyOptions,
  Repository,
  In,
  Connection,
  InsertQueryBuilder,
  Not,
  DataSource,
} from 'typeorm';
import {
  UpdateArticleCategoryDisplayOrderDto,
  UpdateArticleCategoryDto,
} from './article-category/article-category.controller';
import { UpdateArticleDto, UpdateSatusDto } from './article.controller';
import { ArticleDetailDto } from './dto/article-detail.dto';
import { ArticleListDto } from './dto/article-list.dto';
import { CreateArticleCategoryDto } from './dto/create-article-category.dto';
import { CreateArticleDto } from './dto/create-article.dto';
import { ArticleCategoryStatus } from './entity/article-category-status.enum';
import { ArticleCategoryEntity } from './entity/article-category.entity';
import { ArticleRelatedEntity } from './entity/article-related.entity';
import { ArticleToArticleCategoryEntity } from './entity/article-to-article-category.entity';
import { ArticleEntity } from './entity/article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
    @InjectRepository(ArticleToArticleCategoryEntity)
    private readonly articleToArticleCategoryRepository: Repository<ArticleToArticleCategoryEntity>,
    @InjectRepository(ArticleRelatedEntity)
    private readonly articleRelatedRepository: Repository<ArticleRelatedEntity>,
    @InjectRepository(ArticleCategoryEntity)
    private readonly articleCategoryRepository: Repository<ArticleCategoryEntity>,
    private connection: DataSource,
  ) {}

  async create(createArticleDto: CreateArticleDto) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const checkArticle = await this.articleRepository.findOne({
      where: {
        title: createArticleDto.title,
      },
    });

    if (checkArticle) {
      throw new BadRequestException(`Bài viết này đã tồn tại`);
    }

    const article = await this.articleRepository.create(createArticleDto);
    try {
      const newArticle = await queryRunner.manager.save(article);
      const listCategoryIds = createArticleDto.articleCategoryIds;

      // save to category
      await Promise.all(
        listCategoryIds.map(async (category)=>{
          const displayOrderOld = await this.articleToArticleCategoryRepository
          .createQueryBuilder('article_to_articlecategory')
          .where('article_to_articlecategory.articleCategoryId = :categoryId', {
            categoryId: category.id,
          })
          .select('MAX(article_to_articlecategory.displayOrder)', 'max')
          .getRawOne();

        let newDisplayOrder = 1;
        if (
          !!displayOrderOld &&
          !!displayOrderOld.max &&
          !isNaN(displayOrderOld.max)
        ) {
          newDisplayOrder = parseInt(displayOrderOld.max) + 1;
        }

        const article_to_articlecategory =
          this.articleToArticleCategoryRepository.create({
            articleCategory: {
              id: category.id,
            },
            article: {
              id: newArticle.id,
            },
            displayOrder: newDisplayOrder,
          });

        await queryRunner.manager.save(article_to_articlecategory);
        })
      )
   

      // save to relate
      if (
        typeof createArticleDto.realtedArticleIds !== 'undefined' &&
        createArticleDto.realtedArticleIds.length > 0
      ) {
        createArticleDto.realtedArticleIds.forEach(async (articleid) => {
          const relateArticle = this.articleRelatedRepository.create({
            article: {
              id: newArticle.id,
            },
            articleRelatedId: articleid.articleId,
            articleCategoryRelatedId: articleid.articleCategoryId,
            isRelated: true,
          });

          await queryRunner.manager.save(relateArticle);
        });
      }

      // save to attention

      if (
        typeof createArticleDto.attentionArticleIds !== 'undefined' &&
        createArticleDto.attentionArticleIds.length > 0
      ) {
        createArticleDto.attentionArticleIds.forEach(async (articleid) => {
          const attentionArticle = this.articleRelatedRepository.create({
            article: {
              id: newArticle.id,
            },
            articleRelatedId: articleid.articleId,
            articleCategoryRelatedId: articleid.articleCategoryId,
            isRelated: false,
          });

          await queryRunner.manager.save(attentionArticle);
        });
      }

      await queryRunner.commitTransaction();
      await queryRunner.release();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw error;
    }

    return article;
  }

  async update(articleId: string, updateArticleDto: UpdateArticleDto) {
    const article = await this.articleRepository.findOne({where:{id:articleId}});
    if (!article) {
      throw new NotFoundException(`Article ${articleId} not found.`);
    }

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const checkArticle = await this.articleRepository.findOne({
      where: {
        title: updateArticleDto.title,
        id: Not(article.id),
      },
    });

    if (checkArticle) {
      throw new BadRequestException(`Bài viết này đã tồn tại`);
    }

    try {
      await this.articleRepository.save({
        id: articleId,
        ...updateArticleDto,
      });
      const listCategoryIds = updateArticleDto.articleCategoryIds;

      // Xóa category cũ

      const listOlderCategory = await this.articleToArticleCategoryRepository
        .createQueryBuilder('article_to_articlecategory')
        .where('article_to_articlecategory.articleId = :article', {
          article: articleId,
        })
        .select('article_to_articlecategory.articleCategoryId', 'CategoryId')
        .getRawMany();

      if (listOlderCategory.length > 0) {
        listOlderCategory.forEach(async (oldCategory) => {
          const categoryOld =
            await this.articleToArticleCategoryRepository.findOne({
              where: {
                articleId: articleId,
                articleCategoryId: oldCategory.CategoryId,
              },
            });

          await this.articleToArticleCategoryRepository.delete(categoryOld.id);
        });
      }

      // save  category mới
      await Promise.all(
        listCategoryIds.map(async (category) => {
          const displayOrderOld = await this.articleToArticleCategoryRepository
            .createQueryBuilder('article_to_articlecategory')
            .where('article_to_articlecategory.articleCategoryId = :categoryId', {
              categoryId: category.id,
            })
            .select('MAX(article_to_articlecategory.displayOrder)', 'max')
            .getRawOne();
  
          let newDisplayOrder = 1;
          if (
            !!displayOrderOld &&
            !!displayOrderOld.max &&
            !isNaN(displayOrderOld.max)
          ) {
            newDisplayOrder = parseInt(displayOrderOld.max) + 1;
          }
  
          const article_to_articlecategory =
            this.articleToArticleCategoryRepository.create({
              articleCategory: {
                id: category.id,
              },
              article: {
                id: articleId,
              },
              displayOrder: newDisplayOrder,
            });
  
          await queryRunner.manager.save(article_to_articlecategory);
        })
      )
     

      // xoa relate cu

      const listOlderRelated = await this.articleRelatedRepository
        .createQueryBuilder('article_related')
        .where('article_related.articleId = :article', {
          article: articleId,
        })
        .select('article_related.articleRelatedId', 'RelatedId')
        .getRawMany();

      if (listOlderRelated.length > 0) {
        listOlderRelated.forEach(async (oldRelated) => {
          console.log(oldRelated);
          const relatedOld = await this.articleRelatedRepository.findOne({
            where: {
              articleId: articleId,
              articleRelatedId: oldRelated.RelatedId,
              isRelated: true,
            },
          });

          await this.articleRelatedRepository.delete(relatedOld.id);
        });
      }
      // save to relate
      if (
        typeof updateArticleDto.realtedArticleIds !== 'undefined' &&
        updateArticleDto.realtedArticleIds.length > 0
      ) {
        updateArticleDto.realtedArticleIds.forEach(async (articleid) => {
          const relateArticle = this.articleRelatedRepository.create({
            article: {
              id: articleId,
            },
            articleRelatedId: articleid.articleId,
            articleCategoryRelatedId: articleid.articleCategoryId,
            isRelated: true,
          });

          await queryRunner.manager.save(relateArticle);
        });
      }
      // xoa attenion old

      const listOlderAttenion = await this.articleRelatedRepository
        .createQueryBuilder('article_related')
        .where('article_related.articleId = :article', {
          article: articleId,
        })
        .select('article_related.articleRelatedId', 'RelatedId')
        .getRawMany();

      if (listOlderAttenion.length > 0) {
        listOlderAttenion.forEach(async (oldRelated) => {
          const relatedOld = await this.articleRelatedRepository.findOne({
            where: {
              articleId: articleId,
              articleRelatedId: oldRelated.RelatedId,
              isRelated: false,
            },
          });
          await this.articleRelatedRepository.delete(relatedOld.id);
        });
      }

      // save to attention

      if (
        typeof updateArticleDto.attentionArticleIds !== 'undefined' &&
        updateArticleDto.attentionArticleIds.length > 0
      ) {
        updateArticleDto.attentionArticleIds.forEach(async (articleid) => {
          const attentionArticle = this.articleRelatedRepository.create({
            article: {
              id: articleId,
            },
            articleRelatedId: articleid.articleId,
            articleCategoryRelatedId: articleid.articleCategoryId,
            isRelated: false,
          });

          await queryRunner.manager.save(attentionArticle);
        });
      }

      await queryRunner.commitTransaction();
      await queryRunner.release();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw error;
    }
  }

  async delete(articleId: string) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const article = await this.articleRepository.findOne({where:{id:articleId}});
      if (!article) {
        throw new NotFoundException(`Category ${articleId} not found.`);
      }

      // xóa reated article

      const relatedArticle = await this.articleRelatedRepository
        .createQueryBuilder('article_related')
        .where('article_related.articleId = :article', {
          article: articleId,
        })
        .orWhere('article_related.articleRelatedId = :articleRelated', {
          articleRelated: articleId,
        })
        .select('article_related.id', 'Id')
        .getRawMany();

      if (relatedArticle.length > 0) {
        relatedArticle.forEach(async (item) => {
          await this.articleRelatedRepository.delete(item.Id);
        });
      }

      // Xóa trong article to article category
      const artilceToArticleCategory =
        await this.articleToArticleCategoryRepository
          .createQueryBuilder('article_to_articlecategory')
          .where('article_to_articlecategory.articleId = :article', {
            article: articleId,
          })
          .select('article_to_articlecategory.id', 'Id')
          .getRawMany();

      if (artilceToArticleCategory.length > 0) {
        artilceToArticleCategory.forEach(async (item) => {
          await this.articleToArticleCategoryRepository.delete(item.Id);
        });
      }

      await this.articleRepository.delete(articleId);

      await queryRunner.commitTransaction();
      await queryRunner.release();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw error;
    }
  }

  async deleteMul(articleIds: IdDto[]) {
    if (articleIds.length > 0) {
      const queryRunner = this.connection.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
      try {
        for (const articleid of articleIds) {
          const article = await this.articleRepository.findOne({where:{id:articleid.id}});
          if (!article) {
            throw new NotFoundException(`Article ${article} not found.`);
          }

          // xóa reated article

          const relatedArticle = await this.articleRelatedRepository
            .createQueryBuilder('article_related')
            .where('article_related.articleId = :article', {
              article: articleid.id,
            })
            .orWhere('article_related.articleRelatedId = :articleRelated', {
              articleRelated: articleid.id,
            })
            .select('article_related.id', 'Id')
            .getRawMany();

          if (relatedArticle.length > 0) {
            relatedArticle.forEach(async (item) => {
              await this.articleRelatedRepository.delete(item.Id);
            });
          }

          // Xóa trong article to article category
          const artilceToArticleCategory =
            await this.articleToArticleCategoryRepository
              .createQueryBuilder('article_to_articlecategory')
              .where('article_to_articlecategory.articleId = :article', {
                article: articleid.id,
              })
              .select('article_to_articlecategory.id', 'Id')
              .getRawMany();

          if (artilceToArticleCategory.length > 0) {
            artilceToArticleCategory.forEach(async (item) => {
              await this.articleToArticleCategoryRepository.delete(item.Id);
            });
          }

          await this.articleRepository.delete(articleid);
        }
        await queryRunner.commitTransaction();
        await queryRunner.release();
      } catch (error) {
        await queryRunner.rollbackTransaction();
        await queryRunner.release();
        throw error;
      }
    }
  }

  async addToCategory(articleCategoryId: string, articleIds: IdDto[]) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      if (articleIds.length > 0) {
        const displayOrderOld = await this.articleToArticleCategoryRepository
          .createQueryBuilder('article_to_articlecategory')
          .where('article_to_articlecategory.articleCategoryId = :categoryId', {
            categoryId: articleCategoryId,
          })
          .select('MAX(article_to_articlecategory.displayOrder)', 'max')
          .getRawOne();

        let newDisplayOrder = 1;
        if (
          !!displayOrderOld &&
          !!displayOrderOld.max &&
          !isNaN(displayOrderOld.max)
        ) {
          newDisplayOrder = parseInt(displayOrderOld.max) + 1;
        }

        for (const articleId of articleIds) {
          const article_to_articlecategory =
            this.articleToArticleCategoryRepository.create({
              articleCategory: {
                id: articleCategoryId,
              },
              article: {
                id: articleId.id,
              },
              displayOrder: newDisplayOrder,
            });

          await queryRunner.manager.save(article_to_articlecategory);
          newDisplayOrder++;
        }
      }
      await queryRunner.commitTransaction();
      await queryRunner.release();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw error;
    }
  }

  async updateStatus(updateStatusDto: UpdateSatusDto) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      if (updateStatusDto.articleIds.length > 0) {
        for (const articleId of updateStatusDto.articleIds) {
          const article = await this.articleRepository.findOne({where:{id:articleId.id}});
          if (!article) {
            throw new NotFoundException(`Category ${articleId} not found.`);
          }
          article.status = updateStatusDto.status;

          await queryRunner.manager.save(article);
        }
      }
      await queryRunner.commitTransaction();
      await queryRunner.release();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw error;
    }
  }

  async findOne(articleId: string) {
    const article = await this.articleRepository.findOne({where:{id:articleId}});
    if (!article) {
      throw new NotFoundException(`Category ${articleId} not found.`);
    }

    const articleDetail = new ArticleDetailDto();

    articleDetail.id = article.id;
    articleDetail.content = article.content;
    articleDetail.descriptionSeo = article.descriptionSeo;
    articleDetail.deviceDisplay = article.deviceDisplay;
    articleDetail.imgArticleUrl = article.imgArticleUrl;
    articleDetail.imgLink = article.imgLink;
    articleDetail.keyWord = article.keyWord;
    //articleDetail.positionDisplay = article.positionDisplay;
    articleDetail.shortDescription = article.shortDescription;
    articleDetail.status = article.status;
    articleDetail.tag = article.tag;
    articleDetail.title = article.title;
    articleDetail.titleSeo = article.titleSeo;
    articleDetail.urlRedirect = article.urlRedirect;
    articleDetail.urlRedirectToThis = article.urlRedirectToThis;
    articleDetail.videoTag = article.videoTag;

    // get category

    const articleCategory = await this.articleToArticleCategoryRepository
      .createQueryBuilder('article_to_articlecategory')
      .leftJoin(
        'article_category',
        'articlecategory',
        'article_to_articlecategory.articleCategoryId = articlecategory.id',
      )
      .where('article_to_articlecategory.articleId = :article', {
        article: articleId,
      })

      .select('articlecategory.id', 'id')
      .addSelect('articlecategory.name', 'name')
      .getRawMany();

    articleDetail.articleCategorys = articleCategory;

    // Get related
    const articleRelated = await this.articleRelatedRepository
      .createQueryBuilder('article_related')
      .leftJoin('article', 'article', 'article.id = article_related.articleId')
      .leftJoin(
        'article',
        'article2',
        'article2.id = article_related.articleRelatedId',
      )
      .where('article_related.articleId = :article', {
        article: articleId,
      })

      .select('article2.id', 'id')
      .addSelect(
        'article_related.articleCategoryRelatedId',
        'articleCategoryId',
      )
      .addSelect('article2.title', 'name')
      .addSelect('article_related.isRelated', 'isRelated')
      .getRawMany();

    articleDetail.articleRelateds = articleRelated.filter(
      (a) => a.isRelated === 1,
    );
    articleDetail.articleAttentions = articleRelated.filter(
      (a) => a.isRelated !== 1,
    );

    return articleDetail;
  }

  async findAll(searchStr: string, status: ArticleCategoryStatus) {
    const query = this.articleRepository
      .createQueryBuilder('article')
      .orderBy(`article.updatedAt`, 'DESC');

    if (searchStr !== undefined) {
      query.andWhere('article.title like :title', {
        title: `%${searchStr}%`,
      });
    }

    if (status != undefined) {
      query.andWhere('article.status = :status', {
        status: status,
      });
    }

    const [queryData, total] = await query.getManyAndCount();

    const data: Array<ArticleListDto> = [];
    queryData.forEach(async (e) => {
      const item = new ArticleListDto();
      item.id = e.id;
      item.status = e.status;
      item.title = e.title;
      item.updatedAt = e.updatedAt;
      item.imgArticleUrl = e.imgArticleUrl;

      const articleCategory = await this.articleToArticleCategoryRepository
        .createQueryBuilder('article_to_articlecategory')
        .leftJoin(
          'article_category',
          'articlecategory',
          'article_to_articlecategory.articleCategoryId = articlecategory.id',
        )
        .where('article_to_articlecategory.articleId = :article', {
          article: e.id,
        })
        .select('articlecategory.id', 'id')
        .addSelect('articlecategory.name', 'name')
        .getRawMany();

      item.articleCategorys = articleCategory;

      data.push(item);
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return data;
  }

  async findByPosition(position?: BannerPosition) {
    const query = this.articleRepository
      .createQueryBuilder('article')
      .orderBy(`article.updatedAt`, 'DESC');


    const [queryData, total] = await query.getManyAndCount();

    const data: Array<ArticleListDto> = [];
    queryData.forEach(async (e) => {
      const item = new ArticleListDto();
      item.id = e.id;
      item.status = e.status;
      item.shortDescription = e.shortDescription;
      item.descriptionSeo = e.descriptionSeo;
      item.title = e.title;
      item.updatedAt = e.updatedAt;
      item.imgArticleUrl = e.imgArticleUrl;

      const articleCategory = await this.articleToArticleCategoryRepository
        .createQueryBuilder('article_to_articlecategory')
        .leftJoin(
          'article_category',
          'articlecategory',
          'article_to_articlecategory.articleCategoryId = articlecategory.id',
        )
        .where('article_to_articlecategory.articleId = :article', {
          article: e.id,
        })
        .select('articlecategory.id', 'id')
        .addSelect('articlecategory.name', 'name')
        .getRawMany();

      item.articleCategorys = articleCategory;

      data.push(item);
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return data;
  }

  async findByCategory(articleCategoryId: string, searchStr: string) {
    const category = await this.articleCategoryRepository
      .createQueryBuilder('article_category')
      .where('article_category.id=:categoryId', {
        categoryId: articleCategoryId,
      })
      .select('article_category.id', 'id')
      .addSelect('article_category.name', 'name')
      .getRawOne();
   
    const query = this.articleRepository
      .createQueryBuilder('article')
      .leftJoin(
        'article_to_articlecategory',
        'articleToArticleCategory',
        'articleToArticleCategory.articleId = article.id',
      )
      .where('articleToArticleCategory.articleCategoryId = :articleCategory', {
        articleCategory: articleCategoryId,
      })
      .orderBy(`articleToArticleCategory.displayOrder`, 'ASC')
      .select('article.id', 'id')
      .addSelect('article.title', 'title')
      .addSelect('article.status', 'status')
      .addSelect('article.imgArticleUrl', 'imgArticleUrl')
      .addSelect('article.updatedAt', 'updatedAt')
      .addSelect('articleToArticleCategory.displayOrder', 'displayOrder');

    if (searchStr !== undefined) {
      query.orWhere('article.title like :title', {
        title: `%${searchStr}%`,
      });
    }
    
    const data = await query.getRawMany();
   
    const result: Array<ArticleListDto> = [];
    for (const item of data) {
      const temp = new ArticleListDto();
      temp.id = item.id;
      temp.status = item.status;
      temp.title = item.title;
      temp.displayOrder = item.displayOrder;
      temp.imgArticleUrl = item.imgArticleUrl;
      temp.updatedAt = item.updatedAt;
      temp.articleCategorys = [
        {
          id: category.id,
          name: category.name,
        },
      ];
      result.push(temp);
    }
  
    return result;
  }

  async arrangeDisplayOrder(
    articleCategoryId: string,
    updatearticleDisplayOrderDto: UpdateBannerDisplayOrderDto[],
  ) {
    const articleIds = updatearticleDisplayOrderDto.map((e) => e.id);

    //2. Get list category
    const query: FindManyOptions<ArticleToArticleCategoryEntity> = {
      where: {
        articleCategoryId: articleCategoryId,
        articleId: In(articleIds),
      },
    };

    const articleToCategories =
      await this.articleToArticleCategoryRepository.find(query);

    //3. Update category
    for (const item of articleToCategories) {
      const displayOrderOld = updatearticleDisplayOrderDto.filter(
        (x) => x.id === item.articleId,
      )[0];
      await this.articleToArticleCategoryRepository.save(item);
    }

    return updatearticleDisplayOrderDto;
  }

  
}

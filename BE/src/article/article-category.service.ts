import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IdDto } from 'src/common/dto/id.dto';
import { FindManyOptions, Repository, In, Connection, Not, DataSource } from 'typeorm';
import {
  UpdateArticleCategoryDisplayOrderDto,
  UpdateArticleCategoryDto,
} from './article-category/article-category.controller';
import { CreateArticleCategoryDto } from './dto/create-article-category.dto';
import { ArticleCategoryEntity } from './entity/article-category.entity';
import { ArticleToArticleCategoryEntity } from './entity/article-to-article-category.entity';
import { ArticleEntity } from './entity/article.entity';

@Injectable()
export class ArticleCategoryService {
  constructor(
    @InjectRepository(ArticleCategoryEntity)
    private readonly articleCategoryRepository: Repository<ArticleCategoryEntity>,
    @InjectRepository(ArticleToArticleCategoryEntity)
    private readonly articleToArticleCategoryRepository: Repository<ArticleToArticleCategoryEntity>,
    private connection: DataSource,
  ) { }

  async create(createArticleCategoryDto: CreateArticleCategoryDto) {

    const displayOrderOld = await this.articleCategoryRepository
      .createQueryBuilder('article_category')
      .select('MAX(article_category.displayOrder)', 'max')
      .getRawOne();

    if (
      !!displayOrderOld &&
      !!displayOrderOld.max &&
      !isNaN(displayOrderOld.max)
    ) {
      createArticleCategoryDto.displayOrder = parseInt(displayOrderOld.max) + 1;
    } else {
      createArticleCategoryDto.displayOrder = 1;
    }

    const article = await this.articleCategoryRepository.findOne({
      where: {
        name: createArticleCategoryDto.name,
      },
    });

    if (article) {
      throw new BadRequestException(`Danh mục bài viết này đã tồn tại`);
    }

    const articleCategory = await this.articleCategoryRepository.create(
      createArticleCategoryDto,
    );
    console.log(articleCategory);
    await this.articleCategoryRepository.save(articleCategory);
    console.log(1);
    return articleCategory;
  }

  async update(
    articleCategoryId: string,
    updateArticleCategoryDto: UpdateArticleCategoryDto,
  ) {
    const articleCategory = await this.articleCategoryRepository.findOne(
      { where: { id: articleCategoryId } }
    );
    if (!articleCategory) {
      throw new NotFoundException(
        `Article category ${articleCategoryId} not found.`,
      );
    }

    const article = await this.articleCategoryRepository.findOne({
      where: {
        name: updateArticleCategoryDto.name,
        id: Not(articleCategory.id),
      },
    });

    if (article) {
      throw new BadRequestException(`Danh mục bài viết này đã tồn tại`);
    }
    await this.articleCategoryRepository.save({
      id: articleCategoryId,
      ...updateArticleCategoryDto,
    });
  }

  async delete(articleCategoryId: string) {
    const category = await this.articleCategoryRepository.findOne(
      { where: { id: articleCategoryId } }
    );
    if (!category) {
      throw new NotFoundException(`Category ${category} not found.`);
    }

    const listArticleInCategory = await this.articleToArticleCategoryRepository
      .createQueryBuilder('article_to_articlecategory')
      .where(
        'article_to_articlecategory.articleCategoryId = :articleCategory',
        {
          articleCategory: articleCategoryId,
        },
      )
      .select('article_to_articlecategory.articleId', 'ArticleId')
      .getRawMany();
    // todo check có bài viết thì k xóa
    if (listArticleInCategory.length > 0) {
      throw new NotFoundException(
        `Can not delete category has at least one article.`,
      );
    }
    await this.articleCategoryRepository.softDelete(articleCategoryId);
  }

  async deleteMul(articleCategoryIds: IdDto[]) {
    if (articleCategoryIds.length > 0) {
      const queryRunner = this.connection.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
      try {
        for (const articleCategoryId of articleCategoryIds) {
          const category = await this.articleCategoryRepository.findOne(
            { where: { id: articleCategoryId.id } }
          );
          if (!category) {
            throw new NotFoundException(`Category ${category} not found.`);
          }

          const listArticleInCategory =
            await this.articleToArticleCategoryRepository
              .createQueryBuilder('article_to_articlecategory')
              .where(
                'article_to_articlecategory.articleCategoryId = :articleCategory',
                {
                  articleCategory: articleCategoryId.id,
                },
              )
              .select('article_to_articlecategory.articleId', 'ArticleId')
              .getRawMany();
          // todo check có bài viết thì k xóa
          if (listArticleInCategory.length > 0) {
            throw new NotFoundException(
              `Can not delete category has at least one article.`,
            );
          }
          await this.articleCategoryRepository.softDelete(articleCategoryId);
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

  async findAll(searchStr: string) {
    const query = this.articleCategoryRepository
      .createQueryBuilder('article_category')
      .orderBy(`article_category.displayOrder`, 'ASC');

    if (searchStr !== undefined) {
      query.orWhere('article_category.name like :name', {
        name: `%${searchStr}%`,
      });
    }

    return query.getManyAndCount();
  }

  async arrangeDisplayOrder(
    updateArticleCategoryDisplayOrderDto: UpdateArticleCategoryDisplayOrderDto[],
  ) {
    const categoryIds = updateArticleCategoryDisplayOrderDto.map((e) => e.id);

    //2. Get list category
    const query: FindManyOptions<ArticleCategoryEntity> = {
      where: { id: In(categoryIds) },
    };

    const categories = await this.articleCategoryRepository.find(query);

    //3. Update category
    for (const category of categories) {
      const displayOrderOld = updateArticleCategoryDisplayOrderDto.filter(
        (x) => x.id === category.id,
      )[0];
      if (category.displayOrder !== displayOrderOld.displayOrder) {
        category.displayOrder = displayOrderOld.displayOrder;
      }
    }
    await this.articleCategoryRepository.save(categories);

    return updateArticleCategoryDisplayOrderDto;
  }

  async findOne(articleCategoryId: string) {
    const category = await this.articleCategoryRepository.findOne(
      { where: { id: articleCategoryId } }
    );
    if (!category) {
      throw new NotFoundException(`Category ${category} not found.`);
    }

    return category;
  }
}

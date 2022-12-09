
import { InjectRepository } from '@nestjs/typeorm';
import { PageRequest } from 'src/common/interface/page-request.interface';
import { DataSource, In, Repository } from 'typeorm';

import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ArticleToArticleCategoryEntity } from 'src/article/entity/article-to-article-category.entity';
import { ArticleEntity } from 'src/article/entity/article.entity';
import { ArticleCategoryEntity } from 'src/article/entity/article-category.entity';
import { BannerEntity } from 'src/content/entity/banner.entity';
import { BannerPosition } from 'src/content/entity/banner-enum.entity';
import { CustomerFeebackEntity } from './entity/customer_feedback.entity';
import { CreateCustomerDto } from './dto/customer.dto';
import { AdmissionsEntity } from './entity/admissions.entity';
import { CreateAdmissionDto } from './dto/admissions.dto';



@Injectable()
export class ClientService {
    constructor(
        @InjectRepository(ArticleToArticleCategoryEntity)
        private readonly articleToArticleCategoryRepository: Repository<ArticleToArticleCategoryEntity>,
        @InjectRepository(ArticleEntity)
        private readonly articleRepository: Repository<ArticleEntity>,
        @InjectRepository(ArticleCategoryEntity)
        private readonly articleCategoryRepository: Repository<ArticleCategoryEntity>,
        @InjectRepository(BannerEntity)
        private readonly bannerRepository: Repository<BannerEntity>,
        @InjectRepository(CustomerFeebackEntity)
        private readonly customerRepo: Repository<CustomerFeebackEntity>,
        @InjectRepository(AdmissionsEntity)
        private readonly admissionRepo: Repository<AdmissionsEntity>,
        private connection: DataSource
    ) { }

    async getIntroduce(type: string) {

        var data = await this.articleToArticleCategoryRepository.createQueryBuilder("atc")
            .innerJoin("article", 'a', 'atc.articleId = a.id')
            .innerJoin("article_category", 'ac', 'atc.articleCategoryId = ac.id')
            .where("ac.tag=:tag", { tag: BannerPosition[type].toLowerCase() })
            .select("a.id as id").getRawOne();

        let result = Object.values(JSON.parse(JSON.stringify(data))) as any;

        return await this.articleRepository.findOne({ where: { id: result[0] } });
    }

    async getNews(options: PageRequest, type: string) {
        const { pageNo, pageSize } = options;
        var query = this.articleToArticleCategoryRepository.createQueryBuilder("atc")
            .innerJoin("article", 'a', 'atc.articleId = a.id')
            .innerJoin("article_category", 'ac', 'atc.articleCategoryId = ac.id')
            .where("ac.tag=:tag", { tag: BannerPosition[type].toLowerCase() })
            .select("a.id as 'id',a.content as 'content',a.tag as'tag',a.title as 'title',a.imgArticleUrl as 'imgArticleUrl',a.shortDescription as shortDescription,a.createdAt  as createdAt ")

        var data = await query.skip((pageNo - 1) * pageSize)
            .take(pageSize)
            .getRawMany();
        var count = await query.getRawMany();
        let result = Object.values(JSON.parse(JSON.stringify(data))) as any[];

        return { data: result, total: count.length };
    }
    async getOne(id: string) {
        return await this.articleRepository.findOne({ where: { id: id } });
    }
    async getLastNews(type: string) {

        var category = await this.articleCategoryRepository.findOne({ where: { tag: BannerPosition[type].toLowerCase() } });
        var result = await this.articleRepository.createQueryBuilder("art")
            .innerJoin("article_to_articlecategory", "at", "art.id = at.articleId")
            .where("at.articleCategoryId=:id", { id: category.id })
            .orderBy("art.createdAt")
            .skip(0)
            .take(3)
            .getMany()


        return result;
    }
    async getBanner(banner: string) {
        console.log({ positionDisplay: BannerPosition[banner] });
        return await this.bannerRepository.findOne({ where: { positionDisplay: BannerPosition[banner] }, order: { createdAt: 'desc' } })
    }
    async createCustomer(
        customer: CreateCustomerDto,
    ): Promise<Boolean> {

        //2. Check username exists


        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {

            //#region Add user and role

            const userEntity = this.customerRepo.create(customer);
            const user = await queryRunner.manager.save(userEntity);

            await queryRunner.commitTransaction();
            await queryRunner.release();
            return true;
            //#endregion
        } catch (error) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            console.log(error);
            throw new HttpException('Role is not exists', HttpStatus.CONFLICT);

        }
    }
    async updateCustomer(userId: string, customerFeeBack: CreateCustomerDto) {
        const existUser = await this.getCustomerOnd(userId);
        if (!existUser) {
            throw new HttpException('Customer is not exists', HttpStatus.NOT_FOUND);
        }

        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {

            //#region Add user and role
            await this.customerRepo.save({
                id: userId,
                ...customerFeeBack
            });

            await queryRunner.commitTransaction();
            await queryRunner.release();
            //#endregion
            return true;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();

        }
    }
    public async getAllCustomer(options: PageRequest) {
        const { pageNo, pageSize } = options;


        const existUser = await this.connection.createEntityManager()
            .query(`SELECT * FROM customer_feedback order by createdAt desc limit ${(pageNo - 1) * pageSize},${pageSize}`)
        const existUserCount = await this.connection.createEntityManager()
            .query(`SELECT * FROM customer_feedback`)

        return { data: existUser, total: existUserCount };

    }
    async createAdmissions(
        customer: CreateAdmissionDto,
    ): Promise<Boolean> {

        //2. Check username exists


        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {

            //#region Add user and role

            const userEntity = this.admissionRepo.create(customer);
            const user = await queryRunner.manager.save(userEntity);

            await queryRunner.commitTransaction();
            await queryRunner.release();
            return true;
            //#endregion
        } catch (error) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            console.log(error);
            throw new HttpException('Role is not exists', HttpStatus.CONFLICT);

        }
    }
    public async getAdmissions(options: PageRequest) {
        const { pageNo, pageSize } = options;

        const existUser = await this.connection.createEntityManager()
            .query(`SELECT * FROM admissions order by createdAt desc limit ${(pageNo - 1) * pageSize},${pageSize}`)
        const existUserCount = await this.connection.createEntityManager()
            .query(`SELECT * FROM admissions`)

        return { data: existUser, total: existUserCount };
    }
    public async getAdmissionsOne(id: string) {



        const existUser = await this.connection.createEntityManager()
            .query(`SELECT * FROM admissions where id = ?`, [id])


        return existUser[0];

    }
    public async getCustomerOnd(id: string) {



        const existUser = await this.connection.createEntityManager()
            .query(`SELECT * FROM customer_feedback where id = ?`, [id])


        return existUser[0];

    }
}   

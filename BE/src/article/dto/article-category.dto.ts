import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { ArticleCategoryDisplay } from '../entity/article-category-display.enum';
import { ArticleCategoryPosition } from '../entity/article-category-position.enum';
import { ArticleCategoryStatus } from '../entity/article-category-status.enum';

export class ArticleCategoryDto {
  @ApiProperty()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  tag: string;

  @ApiPropertyOptional({ maxLength: 10000 })
  @IsOptional()
  description?: string;

  @ApiProperty({
    type: 'enum',
    enum: ArticleCategoryStatus,
    default: ArticleCategoryStatus.ACTIVE,
  })
  status: ArticleCategoryStatus;


  @ApiProperty({ nullable: false, default: 0 })
  amountDisplay: number;

  @ApiProperty({ nullable: false, default: 0 })
  amountInLine: number;

  @ApiProperty({ nullable: true })
  displayOrder?: number;
}

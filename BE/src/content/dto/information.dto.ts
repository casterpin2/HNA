import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ArticleCategoryStatus } from 'src/article/entity/article-category-status.enum';

export class InformationDto {
  @ApiProperty()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: 'text' })
  description: string;

  @ApiProperty({
    type: 'enum',
    enum: ArticleCategoryStatus,
    default: ArticleCategoryStatus.ACTIVE,
  })
  status: ArticleCategoryStatus;

  @ApiProperty()
  updatedAt: string;
}

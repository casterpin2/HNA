import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { ArticleCategoryStatus } from 'src/article/entity/article-category-status.enum';


export class CustomerDto {
    @ApiProperty()
    @IsNotEmpty()
    id: string;

    @ApiProperty({ nullable: false })
    customerName: string;

    @ApiProperty({ nullable: false })
    avatar: string;

    @ApiProperty({ nullable: false })
    content: string;
    @ApiProperty({
        type: 'enum',
        enum: ArticleCategoryStatus,
        default: ArticleCategoryStatus.ACTIVE,
    })
    status: ArticleCategoryStatus;
}

export class CreateCustomerDto extends OmitType(CustomerDto, [
    'id',
]) { }


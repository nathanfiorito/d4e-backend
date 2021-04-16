import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetSurveysFilterDTO{
    @IsOptional()
    @IsString()
    voteOptionName: string;

    @IsOptional()
    @IsString()
    image: string;
}
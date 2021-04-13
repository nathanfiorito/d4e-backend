import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { VoteOption } from 'src/voteOption/voteOption.entity';

export class CreateSurveyDTO {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    description: string;

    // @IsOptional()
    // @IsArray()
    // @Type(() => VoteOption)
    // voteOptions: VoteOption[];
}
import {IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateVoteOptionDTO { 
    @IsNotEmpty()
    @IsString()
    voteOptionName: string

    @IsOptional()
    image: string
}
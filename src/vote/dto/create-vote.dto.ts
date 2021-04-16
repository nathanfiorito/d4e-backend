import {IsNotEmpty, IsString, IsOptional, IsIn, IsInt } from 'class-validator';
import { VoteGenre } from '../vote-genre.enum';

export class CreateVoteDTO {
    @IsNotEmpty()
    @IsIn([VoteGenre.MALE, VoteGenre.FEMALE, VoteGenre.NOT_INFORMED])
    genre: VoteGenre;

    @IsNotEmpty()
    @IsInt()
    age: number;    
}
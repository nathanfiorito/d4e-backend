import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSurveyDTO {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    description: string;
}
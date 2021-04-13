import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { SurveyStatus } from '../survey-status.enum';

export class GetSurveysFilterDTO{
    @IsOptional()
    @IsIn([SurveyStatus.NOT_STARTED, SurveyStatus.OCCURRING, SurveyStatus.DONE])
    status: SurveyStatus;

    @IsOptional()
    @IsNotEmpty()
    search: string;
}
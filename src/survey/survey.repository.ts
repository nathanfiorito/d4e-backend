import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from 'typeorm';
import {GetSurveysFilterDTO} from "./dto/get-surveys-filter.dto";
import { Survey } from './survey.entity';
import { InternalServerErrorException } from '@nestjs/common';
import { CreateSurveyDTO } from './dto/create-survey.dto';
import { SurveyStatus } from './survey-status.enum';

@EntityRepository(Survey)
export class SurveyRepository extends Repository<Survey>{

    async getSurveys(filterDTO: GetSurveysFilterDTO, user: User): Promise<Survey[]>{
        const { status, search } = filterDTO;
        const query = this.createQueryBuilder('survey');

        query.where('survey.userId = :userId',{userId: user.id})

        if(status){
            query.andWhere('survey.status = :status', {status})
        }
        if(search){
            query.andWhere('(survey.title LIKE :search OR survey.description LIKE :search', {search: `%${search}%`})
        }

        try{
            const surveys = await query.getMany();

            return surveys;
        } catch(error){
            throw new InternalServerErrorException();
        }
    }

    async createSurvey(createSurveyDTO: CreateSurveyDTO, user: User): Promise<Survey>{
        const {title, description} = createSurveyDTO;

        const survey = new Survey();

        survey.title = title;
        survey.description = description;
        survey.status = SurveyStatus.NOT_STARTED;
        //survey.voteOptions = voteOptions;
        survey.user = user;
        
        try{
            await survey.save()
        } catch(error){
            console.log(error)
            throw new InternalServerErrorException();
        }

        delete survey.user;

        return survey;
    }
}

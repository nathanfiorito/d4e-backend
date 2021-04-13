import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SurveyRepository } from './survey.repository';
import { GetSurveysFilterDTO } from './dto/get-surveys-filter.dto';
import { User } from "src/auth/user.entity";
import { Survey } from "./survey.entity";
import { SurveyStatus } from './survey-status.enum';
import { CreateSurveyDTO } from './dto/create-survey.dto';

@Injectable()
export class SurveyService {
    constructor(
        @InjectRepository(SurveyRepository)
        private surveyRepository: SurveyRepository
    ){}

    getSurveys(filterDTO: GetSurveysFilterDTO, user: User): Promise<Survey[]>{
        return this.surveyRepository.getSurveys(filterDTO, user);
    }

    async getSurveyById(id: number, user: User): Promise<Survey>{
        const found = await this.surveyRepository.findOne({where: {id, userId: user.id}});

        if(!found) throw new NotFoundException(`Survey with ID ${id} not found`);

        return found;
    }

    async createSurvey(createSurveyDTO: CreateSurveyDTO, user: User): Promise<Survey>{
        return this.surveyRepository.createSurvey(createSurveyDTO, user);
    }

    async updateSurveyStatus(id: number, status: SurveyStatus, user: User): Promise<Survey>{
        const survey = await this.getSurveyById(id, user);
        survey.status = status;
        await survey.save();
        return survey;

    }

    async deleteSurvey(id: number, user: User): Promise<void>{
        const result = await this.surveyRepository.delete({id, userId: user.id})

        if(result.affected === 0){
            throw new NotFoundException(`Survey with ID ${id} not found`)
        }
    }
}
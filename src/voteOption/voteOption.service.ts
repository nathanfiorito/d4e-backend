import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { CreateVoteOptionDTO } from './dto/create-vote-option.dto';
import { User } from 'src/auth/user.entity';
import { VoteOptionRepository } from './voteOption.repository';
import { InjectRepository } from "@nestjs/typeorm";
import { SurveyService } from '../survey/survey.service';
import { VoteOption } from "./voteOption.entity";
@Injectable()
export class VoteOptionService {
    constructor(
        @InjectRepository(VoteOptionRepository)
        private voteOptionRepository: VoteOptionRepository,
        private surveyService: SurveyService
    ){}

    async getVoteOptions(surveyId: number, user: User): Promise<VoteOption[]>{
        const survey = await this.surveyService.getSurveyById(surveyId, user);
        
        return this.voteOptionRepository.getVoteOptions(survey);        
    }

    async getVoteOpitonById(id: number, surveyId: number, user: User): Promise<VoteOption>{
        const survey = await this.surveyService.getSurveyById(surveyId, user);
        const found = await this.voteOptionRepository.findOne({where: {id, surveyId: survey.id}})

        if(!found) throw new NotFoundException(`VoteOption with ID ${id} not found`);

        return found;
    }

    async createVoteOption(createVoteOptionDTO: CreateVoteOptionDTO, surveyId: number, user: User): Promise<VoteOption>{
        const survey = await this.surveyService.getSurveyById(surveyId, user)

        return this.voteOptionRepository.createVoteOption(createVoteOptionDTO, survey);
    }

    async updateVoteOptionName(id: number, surveyId: number, user: User, name: string){        
        const voteOption = await this.getVoteOpitonById(id, surveyId, user);

        voteOption.voteOptionName = name;
        await voteOption.save();
        return voteOption;
    }

    async updateVoteOptionImage(id: number, surveyId: number, user: User, image: string){        
        const voteOption = await this.getVoteOpitonById(id, surveyId, user);
        
        voteOption.image = image;
        await voteOption.save();
        return voteOption;
    }

    async deleteVoteOption(id: number, surveyId: number, user: User){
        const survey = await this.surveyService.getSurveyById(surveyId, user)
        const result = await this.voteOptionRepository.delete({id, surveyId: survey.id});

        if(result.affected === 0){
            throw new InternalServerErrorException(`Survey with ID ${id} not found`)
        }
    }
}
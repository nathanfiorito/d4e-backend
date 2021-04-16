import { Injectable, InternalServerErrorException } from "@nestjs/common";
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

    async createVoteOption(createVoteOptionDTO: CreateVoteOptionDTO, surveyId: number, user: User){
        const survey = await this.surveyService.getSurveyById(surveyId, user)
        const { voteOptionName, image } = createVoteOptionDTO;
        console.log(survey)
        const voteOption = new VoteOption();

        voteOption.voteOptionName = voteOptionName;
        voteOption.image = image;
        voteOption.survey = survey;
        try{
            await voteOption.save()
            this.surveyService.updateSurveyVoteOptions(voteOption, surveyId, user)
        } catch(error){
            throw new InternalServerErrorException();
        }

        delete voteOption.survey;

        return voteOption;
        //return this.voteOptionRepository.createVoteOption(createVoteOptionDTO, surveyId, user);
    }
}
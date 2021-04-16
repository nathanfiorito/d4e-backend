import { EntityRepository, Repository } from 'typeorm';
import { VoteOption } from './voteOption.entity';
import { User } from '../auth/user.entity';
import { Survey } from '../survey/survey.entity';
import { CreateVoteOptionDTO } from './dto/create-vote-option.dto';
import { InternalServerErrorException } from '@nestjs/common';
import { SurveyService } from 'src/survey/survey.service';

@EntityRepository(VoteOption)
export class VoteOptionRepository extends Repository<VoteOption>{
    constructor(private surveyService: SurveyService){
        super();
    }

    async createVoteOption(createVoteOptionDTO: CreateVoteOptionDTO, surveyId: number, user: User){
        const survey = await this.surveyService.getSurveyById(surveyId, user)
        const { voteOptionName, image } = createVoteOptionDTO;
        
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
    }
}
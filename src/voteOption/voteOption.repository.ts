import { EntityRepository, Repository } from 'typeorm';
import { VoteOption } from './voteOption.entity';
import { Survey } from '../survey/survey.entity';
import { CreateVoteOptionDTO } from './dto/create-vote-option.dto';
import { InternalServerErrorException } from '@nestjs/common';

@EntityRepository(VoteOption)
export class VoteOptionRepository extends Repository<VoteOption>{
    async getVoteOptions(survey: Survey): Promise<VoteOption[]>{
        const query = this.createQueryBuilder('voteOption');

        query.where('voteOption.surveyId = :surveyId',{surveyId: survey.id})
        
        try{
            const voteOptions = await query.getMany();

            return voteOptions
        } catch(error){
            throw new InternalServerErrorException();
        }
    }

    async createVoteOption(createVoteOptionDTO: CreateVoteOptionDTO, survey: Survey){
        const { voteOptionName, image } = createVoteOptionDTO;

        const voteOption = new VoteOption();

        voteOption.voteOptionName = voteOptionName;
        voteOption.image = image;
        voteOption.survey = survey;
        
        try{
            await voteOption.save()
        } catch(error){
            throw new InternalServerErrorException();
        }

        delete voteOption.survey;

        return voteOption;
    }
}
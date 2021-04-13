import { EntityRepository, Repository } from 'typeorm';
import { VoteOption } from './voteOption.entity';
import { User } from '../auth/user.entity';
import { Survey } from '../survey/survey.entity';

@EntityRepository(VoteOption)
export class VoteOptionRepository extends Repository<VoteOption>{

    async getVoteOptions(user: User, survey: Survey){
        const query = this.createQueryBuilder('voteOption');

        query.where('voteOption.surveyId = :surveyId',{surveyId: survey.id})
    }

}
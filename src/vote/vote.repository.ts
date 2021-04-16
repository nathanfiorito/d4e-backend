import { EntityRepository, Repository } from 'typeorm';
import { Vote } from './vote.entity';
import { Survey } from '../survey/survey.entity';
import { InternalServerErrorException } from '@nestjs/common';
import { VoteOption } from '../voteOption/voteOption.entity';
import { CreateVoteDTO } from "./dto/create-vote.dto";

@EntityRepository(Vote)

export class VoteRepository extends Repository<Vote>{
    async getVotes(survey: Survey): Promise<Vote[]>{
        const query = this.createQueryBuilder('vote');

        query.where('vote.surveyId = :surveyId',{surveyId: survey.id})
        
        try{
            const votes = await query.getMany();

            return votes;
        } catch(error){
            throw new InternalServerErrorException();
        }
    }

    async createVote(createVoteDTO: CreateVoteDTO, survey: Survey, voteOption: VoteOption): Promise<Vote>{
        const { genre, age } = createVoteDTO;

        const vote = new Vote();

        vote.genre = genre;
        vote.age = age;
        vote.survey = survey;
        vote.voteOption = voteOption;
        console.log(vote)

        try{
            await vote.save();
        } catch(error){
            console.log(error)
        }

        return vote;
    }

}

import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/auth/user.entity";
import { SurveyService } from "src/survey/survey.service";
import { VoteOptionService } from "src/voteOption/voteOption.service";
import { CreateVoteDTO } from "./dto/create-vote.dto";
import { Vote } from "./vote.entity";
import { VoteRepository } from "./vote.repository";

@Injectable()
export class VoteService {
    constructor(
        @InjectRepository(VoteRepository)
        private voteRepository: VoteRepository,
        private surveyService: SurveyService,
        private voteOptionService: VoteOptionService
    ){}

    async getVotes(surveyId: number, user: User): Promise<Vote[]>{
        const survey = await this.surveyService.getSurveyById(surveyId, user);
        return this.voteRepository.getVotes(survey);
    }

    async createVote(createVoteDTO: CreateVoteDTO, surveyId: number, voteOptionId: number, user: User): Promise<Vote>{
        const survey = await this.surveyService.getSurveyById(surveyId, user);
        const voteOption = await this.voteOptionService.getVoteOpitonById(voteOptionId, surveyId, user);
        return this.voteRepository.createVote(createVoteDTO, survey, voteOption);
    }

}
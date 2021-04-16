import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decoratos';
import { User } from 'src/auth/user.entity';
import { CreateVoteDTO } from './dto/create-vote.dto';
import { Vote } from './vote.entity';
import { VoteService } from './vote.service';

@Controller('vote')
@UseGuards(AuthGuard()) //ISSO É MT IMPORTANTE QUANDO FOR AUTORIZAR ALGO!!!!!!!!!!!
export class VoteController{
    constructor(private voteService: VoteService){}

    @Get(':surveyId')
    getVotes(@Param('surveyId', ParseIntPipe) surveyId: number, @GetUser() user: User): Promise<Vote[]>{
        console.log(surveyId)
        return this.voteService.getVotes(surveyId, user);
    }

    @Post(':surveyId/:voteOptionId/')
    createVote(@Body() createVoteDTO: CreateVoteDTO, @Param('surveyId', ParseIntPipe) surveyId: number, @Param('voteOptionId', ParseIntPipe) voteOptionId: number, @GetUser() user: User): Promise<Vote>{
        return this.voteService.createVote(createVoteDTO, surveyId, voteOptionId, user);
    }
}
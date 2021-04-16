import { Body, Controller, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/get-user.decoratos';
import { User } from 'src/auth/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { CreateVoteOptionDTO } from './dto/create-vote-option.dto';
import { VoteOptionService } from './voteOption.service';

@Controller('vote-option')
@UseGuards(AuthGuard())
export class VoteOptionController{
    constructor(private voteOptionService: VoteOptionService){}

    @Post(':surveyId')
    createVoteOption(@Body() createVoteOptionDTO: CreateVoteOptionDTO, @Param('surveyId', ParseIntPipe) surveyId: number, @GetUser() user: User){
        return this.voteOptionService.createVoteOption(createVoteOptionDTO, surveyId, user);
    }
}
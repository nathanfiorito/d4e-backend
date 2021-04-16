import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { GetUser } from 'src/auth/get-user.decoratos';
import { User } from 'src/auth/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { CreateVoteOptionDTO } from './dto/create-vote-option.dto';
import { VoteOptionService } from './voteOption.service';
import { VoteOption } from './voteOption.entity';

@Controller('vote-option')
@UseGuards(AuthGuard())
export class VoteOptionController{
    constructor(private voteOptionService: VoteOptionService){}

    @Get(':surveyId')
    getVoteOptions(@Param('surveyId', ParseIntPipe) surveyId: number, @GetUser() user: User): Promise<VoteOption[]>{
        return this.voteOptionService.getVoteOptions(surveyId, user);
    }

    @Get(':surveyId/:id')
    getVoteOptionById(@Param('id', ParseIntPipe) id:number , @Param('surveyId', ParseIntPipe) surveyId: number, @GetUser() user: User): Promise<VoteOption>{
        return this.voteOptionService.getVoteOpitonById(id, surveyId, user);
    }

    @Post(':surveyId')
    createVoteOption(@Body() createVoteOptionDTO: CreateVoteOptionDTO, @Param('surveyId', ParseIntPipe) surveyId: number, @GetUser() user: User): Promise<VoteOption>{
        return this.voteOptionService.createVoteOption(createVoteOptionDTO, surveyId, user);
    }

    @Patch(':surveyId/:id/name')
    updateVoteOptionName(@Param('id', ParseIntPipe) id:number , @Param('surveyId', ParseIntPipe) surveyId: number, @GetUser() user: User, @Body('name') name: string): Promise<VoteOption>{
        return this.voteOptionService.updateVoteOptionName(id, surveyId, user, name);
    }

    @Patch(':surveyId/:id/image')
    updateVoteOptionImage(@Param('id', ParseIntPipe) id:number , @Param('surveyId', ParseIntPipe) surveyId: number, @GetUser() user: User, @Body('image') image: string): Promise<VoteOption>{
        return this.voteOptionService.updateVoteOptionImage(id, surveyId, user, image);
    }

    @Delete(':surveyId/:id')
    deleteVoteOption(@Param('id', ParseIntPipe) id: number, @Param('surveyId', ParseIntPipe) surveyId: number, @GetUser() user: User): Promise<void>{
        return this.voteOptionService.deleteVoteOption(id, surveyId, user);
    }
}
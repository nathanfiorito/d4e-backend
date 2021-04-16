import { AuthModule } from './../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { VoteRepository } from './vote.repository';
import { VoteController } from './vote.controller';
import { VoteService } from './vote.service';
import { SurveyModule } from '../survey/survey.module';
import { VoteOptionModule } from '../voteOption/voteOption.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([VoteRepository]),
        AuthModule,
        SurveyModule,
        VoteOptionModule
    ],
    controllers: [VoteController],
    providers: [VoteService]
})

export class VoteModule{}
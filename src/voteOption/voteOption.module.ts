import { AuthModule } from './../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoteOptionRepository } from './voteOption.repository';
import { VoteOptionController } from './voteOption.controller';
import { VoteOptionService } from './voteOption.service';
import { Module } from '@nestjs/common';
import { SurveyService } from '../survey/survey.service';
import { SurveyModule } from '../survey/survey.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([VoteOptionRepository]),
        AuthModule,
        SurveyModule
    ],
    controllers: [VoteOptionController],
    providers: [VoteOptionService]
})

export class VoteOptionModule{}
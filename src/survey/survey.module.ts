import { AuthModule } from './../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyRepository } from './survey.repository';
import { SurveyController } from './survey.controller';
import { SurveyService } from './survey.service';
import { Module } from '@nestjs/common';

@Module({
    imports: [
        TypeOrmModule.forFeature([SurveyRepository]),
        AuthModule
    ],
    controllers: [SurveyController],
    providers: [SurveyService]
})

export class SurveyModule{}
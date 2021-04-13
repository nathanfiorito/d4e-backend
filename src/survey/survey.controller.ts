import { SurveyStatus } from './survey-status.enum';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { GetSurveysFilterDTO } from './dto/get-surveys-filter.dto';
import { User as GetUser } from 'src/auth/get-user.decoratos';
import { User } from 'src/auth/user.entity';
import { Survey } from './survey.entity';
import { CreateSurveyDTO } from './dto/create-survey.dto';
import { SurveyStatusValidationPipe } from './pipe/survey-status-validation.pipe';

@Controller('surveys')
export class SurveyController{
    constructor(private surveyService: SurveyService){}

    @Get()
    getSurveys(@Query(ValidationPipe) filterDTO: GetSurveysFilterDTO, @GetUser() user: User): Promise<Survey[]>{
        return this.surveyService.getSurveys(filterDTO, user);
    }

    @Get('/porra')
    getUserId(@GetUser() user: User){
        console.log(user)
    }

    @Post()
    @UsePipes(ValidationPipe)
    createSurvey(@GetUser() user: User){
        return console.log(user)
        //@Body() createSurveyDTO: CreateSurveyDTO, 
        //return this.surveyService.createSurvey(createSurveyDTO, user);
    }

    @Patch(':id/status')
    updateSurveyStatus(@Param('id', ParseIntPipe) id: number, @Body('status', SurveyStatusValidationPipe) status: SurveyStatus, @GetUser() user: User): Promise<Survey>{
        return this.surveyService.updateSurveyStatus(id, status, user);
    }

    @Delete(':id')
    deleteTask(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<void>{
        return this.surveyService.deleteSurvey(id, user);
    }
}
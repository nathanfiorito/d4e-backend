import { SurveyStatus } from './survey-status.enum';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { GetSurveysFilterDTO } from './dto/get-surveys-filter.dto';
import { GetUser } from 'src/auth/get-user.decoratos';
import { User } from 'src/auth/user.entity';
import { Survey } from './survey.entity';
import { CreateSurveyDTO } from './dto/create-survey.dto';
import { SurveyStatusValidationPipe } from './pipe/survey-status-validation.pipe';
import { AuthGuard } from '@nestjs/passport';

@Controller('surveys')
@UseGuards(AuthGuard()) //ISSO É MT IMPORTANTE QUANDO FOR AUTORIZAR ALGO!!!!!!!!!!!
export class SurveyController{
    constructor(private surveyService: SurveyService){}

    @Get()
    getSurveys(@Query(ValidationPipe) filterDTO: GetSurveysFilterDTO, @GetUser() user: User): Promise<Survey[]>{
        return this.surveyService.getSurveys(filterDTO, user);
    }


    @Get(':id')
    getSurveyById(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<Survey>{
        return this.surveyService.getSurveyById(id, user);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createSurvey(@Body() createSurveyDTO: CreateSurveyDTO, @GetUser() user: User){
        return this.surveyService.createSurvey(createSurveyDTO, user);
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
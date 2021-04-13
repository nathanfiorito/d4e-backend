import { SurveyStatus } from './../survey-status.enum';
import { BadRequestException, PipeTransform } from "@nestjs/common";

export class SurveyStatusValidationPipe implements PipeTransform {
    readonly allowedStatus = [
        SurveyStatus.DONE,
        SurveyStatus.OCCURRING,
        SurveyStatus.NOT_STARTED
    ]

    transform(value: any) {
        value = value.toUpperCase();
        
        if(!this.isStatusValid(value)) throw new BadRequestException(`"${value}" is an invalid status`);

        return value;
    }

    private isStatusValid(status: any){
        const idx = this.allowedStatus.indexOf(status);
        return idx !== -1;
    }
}
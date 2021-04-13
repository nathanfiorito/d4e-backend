import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Survey } from '../survey/survey.entity';

@Entity()
export class VoteOption extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    voteOptionName: string;

    @Column()
    image: string;

    @ManyToOne(type => Survey, survey => survey.voteOptions, {eager: false})
    survey: Survey;

    @Column()
    surveyId: number;
}
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
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
    @JoinColumn()
    survey: Survey;

    @Column()
    surveyId: number;
}
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Survey } from '../survey/survey.entity';
import { Vote } from '../vote/vote.entity';

@Entity()
export class VoteOption extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    voteOptionName: string;

    @Column()
    image: string;

    @ManyToOne(type => Survey, survey => survey.voteOptions, {eager: false, onDelete: 'CASCADE'})
    @JoinColumn()
    survey: Survey;

    @OneToMany(type => Vote, vote => vote.voteOption, {eager: true, onDelete: 'CASCADE'})
    @JoinColumn()
    votes: Vote[];

    @Column()
    surveyId: number;
}
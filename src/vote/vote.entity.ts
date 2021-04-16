import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Survey } from '../survey/survey.entity';
import { VoteGenre } from './vote-genre.enum';
import { VoteOption } from '../voteOption/voteOption.entity';

@Entity()
export class Vote extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    genre: VoteGenre;

    @Column()
    age: number;

    @ManyToOne(type => Survey, survey => survey.votes, {eager: false, onDelete: 'CASCADE'})
    @JoinColumn()
    survey: Survey;

    @ManyToOne(type => VoteOption, voteOption => voteOption.votes, {eager: false, onDelete:'CASCADE'})
    @JoinColumn()
    voteOption: VoteOption;
}
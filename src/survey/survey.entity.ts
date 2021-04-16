import { User } from 'src/auth/user.entity';
import { Vote } from 'src/vote/vote.entity';
import { VoteOption } from 'src/voteOption/voteOption.entity';
// import { Vote } from 'src/vote/vote.entity';
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { SurveyStatus } from './survey-status.enum';

@Entity()
export class Survey extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: SurveyStatus;

    @OneToMany(type => Vote, vote => vote.survey, {eager: true})
    votes: Vote[];

    @OneToMany(type => VoteOption, voteOption => voteOption.survey, {eager: true})
    voteOptions: VoteOption[];
    
    @ManyToOne(type => User, user => user.surveys, {eager: false, onDelete: 'CASCADE'})
    user: User;

    @Column()
    userId: number;
}
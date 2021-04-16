import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from "bcrypt";
import { Survey } from '../survey/survey.entity';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string

    @Column()
    password: string

    @Column()
    salt: string

    @OneToMany(type => Survey, survey => survey.user, {eager: true, cascade: true})
    surveys: Survey[];

    async validatePassword(password: string): Promise<Boolean>{
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
}
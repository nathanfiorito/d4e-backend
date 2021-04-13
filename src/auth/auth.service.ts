import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthCredentialsDTO } from "./dto/auth-credentials.dto";
import { JwtPayload } from "./jwt-payload.interface";
import { UserRepository } from "./user.repository";

@Injectable()
export class AuthService{
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtSerivce: JwtService
    ){}

    async singUp(authCredentialsDTO: AuthCredentialsDTO): Promise<void>{
        return this.userRepository.singUp(authCredentialsDTO);
    }

    async singIn(authCredentialsDTO: AuthCredentialsDTO): Promise<{accessToken: string}>{
        const username = await this.userRepository.validateUserPassword(authCredentialsDTO);
        if(!username){
            throw new UnauthorizedException('Dados Incorretos.');
        }

        const payload: JwtPayload = {username};
        const accessToken = await this.jwtSerivce.sign(payload);
        
        return {accessToken}
    }
}
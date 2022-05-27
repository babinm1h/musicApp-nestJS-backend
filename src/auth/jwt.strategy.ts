import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import mongoose from 'mongoose';
import { UsersService } from 'src/users/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: `2022`
        })
    }


    async validate(payload: { id: mongoose.Types.ObjectId }) {
        const user = await this.usersService.findById(payload.id)
        if (!user) throw new UnauthorizedException("Not allowed!")

        return user
    }
}
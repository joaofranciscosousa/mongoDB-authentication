import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'ajQIa5l51ty9h+ThaXUm+Fb/+BHWlyngA99pVyutKiA=',
    });
  }

  async validate(payload: any) {
    return { id: payload.id, email: payload.email };
  }
}

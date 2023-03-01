import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'
import { compareSync } from 'bcrypt'
import AppError from 'src/helpers/errors/AppError'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService, private readonly jwtService: JwtService) { }

  async login(user: User) {
    const payload = { sub: user.id, email: user.email }
    delete user.password
    return {
      user: user,
      token: this.jwtService.sign(payload)
    }
  }

  async validateUser(email: string, password: string) {
    let user: User
    try {
      user = await this.userService.findByEmail(email)
    } catch (err) {
      return null
    }
    if (!user) throw new AppError('User not exists.', 404)
    const isPasswordValid = compareSync(password, user.password)
    if (!isPasswordValid) return null
    return user
  }
}

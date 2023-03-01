import { Injectable } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { hashSync } from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    })
  }

  async create({ name, email, password, is_admin }: CreateUserDto): Promise<User> {
    return await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashSync(password, 10),
        is_admin: is_admin ? is_admin : false
      }
    })
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany()
    users.map(user => delete user.password)
    return users
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.prisma.user.findUnique({ where: { email } })
  }

  async findOne(id: string): Promise<User | undefined> {
    return this.prisma.user.findUnique({ where: { id } })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  async remove(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } })
  }
}

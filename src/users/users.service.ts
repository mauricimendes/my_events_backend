import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { hashSync } from 'bcrypt'
import AppError from 'src/helpers/errors/AppError'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async create({ name, email, password, is_admin, avatar }: CreateUserDto): Promise<User> {
    const checkedUsersExists = await this.findByEmail(email)
    if (checkedUsersExists) throw new AppError('User already exists.', 400)

    return await this.prisma.user.create({
      data: {
        name,
        email,
        avatar,
        password: hashSync(password, 10),
        is_admin: is_admin ? is_admin : false
      },
      select: {
        id: true,
        name: true,
        email: true,
        is_admin: true,
        avatar: true,
        created_at: true,
        updated_at: true,
        deleted_at: true
      },
    }) as User
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        is_admin: true,
        created_at: true,
        updated_at: true,
        deleted_at: true
      },
      where: {
        deleted_at: null
      },
      orderBy: { created_at: 'asc' }
    })

    return users as User[]
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.prisma.user.findUnique({ where: { email } })
    if (!user) return undefined
    if (user.deleted_at !== null) throw new AppError('User not exists.', 404)
    return user
  }

  async findOne(id: string): Promise<User | undefined> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        is_admin: true,
        created_at: true,
        updated_at: true,
        deleted_at: true
      },
    })
    if (user.deleted_at !== null) throw new AppError('User not exists.', 404)
    return user as User
  }

  async update(id: string, { email, name, password, avatar }: UpdateUserDto): Promise<void> {
    const checkedUserExists = await this.findOne(id)
    if (!checkedUserExists) throw new AppError('User not exists.', 404)

    const checkEmailAlreadyUsed = await this.findByEmail(email)
    if (checkEmailAlreadyUsed) throw new AppError('Email already used.', 404)

    await this.prisma.user.update({
      where: { id }, data: {
        email,
        name,
        avatar,
        password: hashSync(password, 10)
      }
    })
  }

  async remove(id: string): Promise<void> {
    await this.prisma.user.update({ where: { id }, data: { deleted_at: new Date() } })
  }
}

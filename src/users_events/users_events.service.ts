import { Injectable } from '@nestjs/common'
import { UsersEvents } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class UsersEventsService {
  constructor(private prisma: PrismaService) { }

  async create(user_id: string, event_id: string): Promise<UsersEvents> {
    return await this.prisma.usersEvents.create({ data: { user_id, event_id } })
  }

  async findAll(): Promise<UsersEvents[]> {
    return await this.prisma.usersEvents.findMany({
      where: {
        event: {
          deleted_at: null
        },
        deleted_at: null
      }
    })
  }

  async remove(id: string): Promise<void> {
    await this.prisma.usersEvents.update({ where: { id }, data: { deleted_at: new Date() } })
  }
}

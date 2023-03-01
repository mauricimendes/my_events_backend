import { Injectable } from '@nestjs/common'
import { PrismaService, } from 'src/prisma.service'
import { Event } from '@prisma/client'
import { CreateEventDto } from './dto/create-event.dto'
import { UpdateEventDto } from './dto/update-event.dto'

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) { }

  async create(createEventDto: CreateEventDto): Promise<Event> {
    return await this.prisma.event.create({ data: createEventDto })
  }

  async findAll(): Promise<Event[]> {
    return await this.prisma.event.findMany({ where: { deleted_at: null }, orderBy: { created_at: 'asc' } })
  }

  async findOne(id: string): Promise<Event | undefined> {
    const event = await this.prisma.event.findUnique({ where: { id } })
    if (!event) return undefined
    if (event.deleted_at !== null) return undefined
    return event
  }

  async update(id: string, updateEventDto: UpdateEventDto): Promise<void> {
    await this.prisma.event.update({ where: { id }, data: updateEventDto })
  }

  async remove(id: string): Promise<void> {
    await this.prisma.event.update({ where: { id }, data: { deleted_at: new Date() } })
  }
}

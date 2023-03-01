import { Module } from '@nestjs/common'
import { UsersEventsService } from './users_events.service'
import { UsersEventsController } from './users_events.controller'
import { PrismaService } from 'src/prisma.service'

@Module({
  controllers: [UsersEventsController],
  providers: [UsersEventsService, PrismaService]
})
export class UsersEventsModule { }

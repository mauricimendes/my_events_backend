import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common'
import { UsersEventsService } from './users_events.service'
import { AuthGuard } from '@nestjs/passport'

@Controller('users-events')
@UseGuards(AuthGuard('jwt'))
export class UsersEventsController {
  constructor(private readonly usersEventsService: UsersEventsService) { }

  @Post(':id')
  create(@Req() req: any, @Param('id') event_id: string) {
    return this.usersEventsService.create(req.user.id, event_id)
  }

  @Get()
  findAll() {
    return this.usersEventsService.findAll()
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersEventsService.remove(id)
  }
}

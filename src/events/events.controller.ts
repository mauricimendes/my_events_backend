import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common'
import { EventsService } from './events.service'
import { CreateEventDto } from './dto/create-event.dto'
import { UpdateEventDto } from './dto/update-event.dto'
import { AuthGuard } from '@nestjs/passport'
import { FileInterceptor } from '@nestjs/platform-express'
import { readFileSync } from 'fs'

@Controller('events')
@UseGuards(AuthGuard('jwt'))
export class EventsController {
  constructor(private readonly eventsService: EventsService) { }

  @Post()
  @UseInterceptors(FileInterceptor('logo'))
  create(@Body() {
    name,
    description,
    local,
    initial_date,
    final_date
  }: CreateEventDto, @UploadedFile() logo: Express.Multer.File) {
    return this.eventsService.create({
      name,
      description,
      local,
      logo: `data:${logo.mimetype};base64, ${logo.buffer.toString('base64')}`,
      initial_date,
      final_date
    })
  }

  @Get()
  findAll() {
    return this.eventsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(id, updateEventDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id)
  }
}

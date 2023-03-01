import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { EventsModule } from './events/events.module'
import { UsersEventsModule } from './users_events/users_events.module'

@Module({
  imports: [UsersModule, EventsModule, UsersEventsModule, AuthModule],
})
export class AppModule { }

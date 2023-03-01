import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { EventsModule } from './events/events.module';

@Module({
  imports: [UsersModule, EventsModule, AuthModule],
})
export class AppModule { }

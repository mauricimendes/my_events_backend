import { Test, TestingModule } from '@nestjs/testing';
import { UsersEventsController } from './users_events.controller';
import { UsersEventsService } from './users_events.service';

describe('UsersEventsController', () => {
  let controller: UsersEventsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersEventsController],
      providers: [UsersEventsService],
    }).compile();

    controller = module.get<UsersEventsController>(UsersEventsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { CharacterService } from './character.service';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Character } from './character.entity';

describe('CharacterService', () => {
  let service: CharacterService;
  const charactersRepo = { find: () => [] };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([Character])],
      providers: [CharacterService],
    })
      .overrideProvider(getRepositoryToken(Character))
      .useValue(charactersRepo)
      .compile();

    service = module.get<CharacterService>(CharacterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

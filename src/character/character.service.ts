import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Character } from './character.entity';

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(Character)
    private readonly characterRepo: Repository<Character>,
  ) {}

  findAll(): Promise<Character[]> {
    return this.characterRepo.find();
  }

  findOne(id: string): Promise<Character> {
    return this.characterRepo.findOne(id);
  }

  create(char: Character): Promise<Character> {
    const instance = this.characterRepo.create(char);
    return this.characterRepo.save(instance);
  }
}

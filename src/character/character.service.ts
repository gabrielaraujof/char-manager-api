import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';

import { Character } from './character.entity';

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(Character)
    private readonly characterRepo: Repository<Character>,
  ) {}

  findAll(): Observable<Character[]> {
    return from(this.characterRepo.find());
  }

  findOne(id: string): Observable<Character> {
    return from(this.characterRepo.findOne(id));
  }

  create(char: Character): Observable<Character> {
    const instance = this.characterRepo.create(char);
    return from(this.characterRepo.save(instance));
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ObjectID } from 'typeorm';

import { Character } from './character.entity';


@Injectable()
export class CharacterService {
    constructor(
        @InjectRepository(Character)
        private readonly characterRepo: Repository<Character>,
    ) { }

    async findAll(): Promise<Character[]> {
        return this.characterRepo.find();
    }

    async findOne(id: string) {
        return this.characterRepo.findOne(id);
    }

    async create(char: Character): Promise<Character> {
        const instance = this.characterRepo.create(char);
        return this.characterRepo.save(instance);
    }
}

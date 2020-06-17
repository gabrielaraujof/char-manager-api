import { Controller, Get } from '@nestjs/common';
import { CharacterService } from './character.service';
import { Character } from './character.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('characters')
@Controller('characters')
export class CharacterController {
    constructor(private readonly characterService: CharacterService) { }

    @Get()
    findAll(): Promise<Character[]> {
        return this.characterService.findAll();
    }
}

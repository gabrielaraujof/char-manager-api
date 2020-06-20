import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { CharacterService } from './character.service';
import { Character } from './character.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('characters')
@Controller('characters')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Post()
  create(@Body() createCharDto: Character): Promise<Character> {
    return this.characterService.create(createCharDto);
  }

  @Get()
  findAll(): Promise<Character[]> {
    return this.characterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Character> {
    return this.characterService.findOne(id);
  }
}

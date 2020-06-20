import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { CharacterService } from './character.service';
import { Character } from './character.entity';

@ApiTags('characters')
@ApiBearerAuth()
@Controller('characters')
@UseGuards(AuthGuard())
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

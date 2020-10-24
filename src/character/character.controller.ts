import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { CharacterService } from './character.service';
import { Character } from './character.entity';
import { Observable } from 'rxjs';

@ApiTags('characters')
@ApiBearerAuth()
@Controller('characters')
@UseGuards(AuthGuard())
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Post()
  create(@Body() createCharDto: Character): Observable<Character> {
    return this.characterService.create(createCharDto);
  }

  @Get()
  findAll(): Observable<Character[]> {
    return this.characterService.findAll();
  }
  
  @Get(':id')
  findOne(@Param('id') id: string): Observable<Character> {
    return this.characterService.findOne(id);
  }
}

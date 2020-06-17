import { Character } from './character.entity';

describe('Character', () => {
  it('should be defined', () => {
    expect(new Character()).toBeDefined();
  });
});

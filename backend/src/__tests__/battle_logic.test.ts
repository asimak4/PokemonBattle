import { BattleService } from '../services/battle';
import { PokemonService } from '../services/pokemonService';

describe('Pokemon Battle Logic', () => {
  let battleService: BattleService;
  let pokemonService: PokemonService;

  beforeEach(() => {
    battleService = new BattleService();
    pokemonService = new PokemonService();
  });

  // Battle Logic Test: Test battle outcome with known winner
  it('should make Fire type win against Grass type', () => {
    const charmander = pokemonService.getPokemonByName('Charmander');
    const bulbasaur = pokemonService.getPokemonByName('Bulbasaur');

    expect(charmander).toBeDefined();
    expect(bulbasaur).toBeDefined();

    if (charmander && bulbasaur) {
      const result = battleService.battle(charmander, bulbasaur);

      expect(result.winner).toBe('Charmander');
      expect(result.loser).toBe('Bulbasaur');
      expect(result.explanation).toContain('Fire is super effective against Grass');
    }
  });

  // Battle Logic Test: Test battle outcome with Water vs Fire
  it('should make Water type win against Fire type', () => {
    const squirtle = pokemonService.getPokemonByName('Squirtle');
    const charmander = pokemonService.getPokemonByName('Charmander');

    expect(squirtle).toBeDefined();
    expect(charmander).toBeDefined();

    if (squirtle && charmander) {
      const result = battleService.battle(squirtle, charmander);

      expect(result.winner).toBe('Squirtle');
      expect(result.loser).toBe('Charmander');
      expect(result.explanation).toContain('Water is super effective against Fire');
    }
  });

  // Battle Logic Test: Test response structure
  it('should return expected response format', () => {
    const charmander = pokemonService.getPokemonByName('Charmander');
    const bulbasaur = pokemonService.getPokemonByName('Bulbasaur');

    expect(charmander).toBeDefined();
    expect(bulbasaur).toBeDefined();

    if (charmander && bulbasaur) {
      const result = battleService.battle(charmander, bulbasaur);

      // Check basic response structure
      expect(result).toHaveProperty('winner');
      expect(result).toHaveProperty('loser');
      expect(result).toHaveProperty('explanation');
      expect(result).toHaveProperty('pokemon1Stats');
      expect(result).toHaveProperty('pokemon2Stats');
      expect(result).toHaveProperty('battleScore');
      expect(result.battleScore).toHaveProperty('pokemon1Score');
      expect(result.battleScore).toHaveProperty('pokemon2Score');
    }
  });

  // Error Handling Test
  it('should handle non-existent Pokemon gracefully', () => {
    const charmander = pokemonService.getPokemonByName('Charmander');
    const nonExistent = pokemonService.getPokemonByName('testPokemon');

    expect(charmander).toBeDefined();
    expect(nonExistent).toBeUndefined();
  });
}); 
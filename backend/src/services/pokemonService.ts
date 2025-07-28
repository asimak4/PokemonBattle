import { Pokemon } from '../types/Pokemon';
import * as pokedex from '../data/pokedex.json';

export class PokemonService {
  private pokemon: Pokemon[] = pokedex.pokemon as Pokemon[];

  getAllPokemon(): Pokemon[] {
    return this.pokemon;
  }

  getPokemonByName(name: string): Pokemon | undefined {
    return this.pokemon.find(p => 
      p.name.toLowerCase() === name.toLowerCase()
    );
  }
}
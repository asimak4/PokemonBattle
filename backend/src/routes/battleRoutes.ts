import express from 'express';
import { PokemonService } from '../services/pokemonService';
import { BattleService } from '../services/battle';
import { BattleRequest } from '../types/BattleRequest';

const router = express.Router();
const pokemonService = new PokemonService();
const battleService = new BattleService();

router.post('/battle', (req, res) => {
  try {
    const { pokemon1, pokemon2 }: BattleRequest = req.body;

    if (!pokemon1 || !pokemon2) {
      return res.status(400).json({ error: 'Both pokemon names are required' });
    }

    const p1 = pokemonService.getPokemonByName(pokemon1);
    const p2 = pokemonService.getPokemonByName(pokemon2);

    if (!p1) {
      return res.status(404).json({ error: `Pokemon "${pokemon1}" not found` });
    }
    if (!p2) {
      return res.status(404).json({ error: `Pokemon "${pokemon2}" not found` });
    }

    const result = battleService.battle(p1, p2);
    res.json(result);
  } catch (error) {
    console.error('Battle error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/pokemon', (req, res) => {
  try {
    const pokemon = pokemonService.getAllPokemon();
    res.json(pokemon.map(p => ({ 
      id: p.id, 
      name: p.name, 
      type: p.type,
      img: p.img 
    })));
  } catch (error) {
    console.error('Get pokemon error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
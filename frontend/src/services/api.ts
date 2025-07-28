import axios from 'axios';
import { Pokemon } from '../types/Pokemon';
import { BattleResult } from '../types/BattleResult';

const API_BASE = 'http://localhost:3001/api';

export const api = {
  getPokemon: async (): Promise<Pick<Pokemon, 'id' | 'name' | 'type' | 'img'>[]> => {
    const response = await axios.get(`${API_BASE}/pokemon`);
    return response.data;
  },

  battle: async (pokemon1: string, pokemon2: string): Promise<BattleResult> => {
    const response = await axios.post(`${API_BASE}/battle`, {
      pokemon1,
      pokemon2
    });
    return response.data;
  }
};
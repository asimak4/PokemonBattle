import { Pokemon } from "./Pokemon";

export interface BattleResult {
    winner: string;
    loser: string;
    explanation: string;
    pokemon1Stats: Pokemon;
    pokemon2Stats: Pokemon;
    battleScore: {
      pokemon1Score: number;
      pokemon2Score: number;
    };
}
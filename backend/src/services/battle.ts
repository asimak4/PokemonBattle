import { Pokemon } from '../types/Pokemon';
import { BattleResult } from '../types/BattleResult';

export class BattleService {
  // Simple type effectiveness
  private typeEffectiveness: { [key: string]: { [key: string]: number } } = {
    'Fire': { 'Grass': 2, 'Water': 0.5 },
    'Water': { 'Fire': 2, 'Grass': 0.5 },
    'Grass': { 'Water': 2, 'Fire': 0.5 }
  };

  battle(pokemon1: Pokemon, pokemon2: Pokemon): BattleResult {
    const score1 = this.calculateScore(pokemon1, pokemon2);
    const score2 = this.calculateScore(pokemon2, pokemon1);

    const winner = score1 > score2 ? pokemon1 : pokemon2;
    const loser = score1 > score2 ? pokemon2 : pokemon1;
    
    return {
      winner: winner.name,
      loser: loser.name,
      explanation: `${winner.name} wins! ${this.getExplanation(winner, loser)}`,
      pokemon1Stats: pokemon1,
      pokemon2Stats: pokemon2,
      battleScore: {
        pokemon1Score: score1,
        pokemon2Score: score2
      }
    };
  }

  private calculateScore(attacker: Pokemon, defender: Pokemon): number {
    let score = 100;
    
    // Type effectiveness
    for (const attackerType of attacker.type) {
      for (const defenderType of defender.type) {
        const effectiveness = this.typeEffectiveness[attackerType]?.[defenderType];
        if (effectiveness) {
          score *= effectiveness;
        }
      }
    }
    
    // Add some randomness
    score += Math.random() * 50;
    
    return score;
  }

  private getExplanation(winner: Pokemon, loser: Pokemon): string {
    // Check for type advantage
    for (const winnerType of winner.type) {
      for (const loserType of loser.type) {
        if (this.typeEffectiveness[winnerType]?.[loserType] === 2) {
          return `${winnerType} is super effective against ${loserType}!`;
        }
      }
    }
    
    return "It was a close battle!";
  }
}
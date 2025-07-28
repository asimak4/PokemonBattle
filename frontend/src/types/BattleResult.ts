export interface BattleResult {
    winner: string;
    loser: string;
    explanation: string;
    pokemon1Stats: any;
    pokemon2Stats: any;
    battleScore: {
      pokemon1Score: number;
      pokemon2Score: number;
    };
}
import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Pokemon } from '../types/Pokemon';
import { BattleResult } from '../types/BattleResult';
import PokemonSelector from './PokemonSelector';

const BattleSimulator: React.FC = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [selectedPokemon1, setSelectedPokemon1] = useState<string>('');
  const [selectedPokemon2, setSelectedPokemon2] = useState<string>('');
  const [battleResult, setBattleResult] = useState<BattleResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    loadPokemon();
  }, []);

  const loadPokemon = async () => {
    try {
      const data = await api.getPokemon();
      setPokemon(data);
    } catch (err) {
      setError('Failed to load Pokemon. Make sure the backend is running!');
    }
  };

  const handleBattle = async () => {
    if (!selectedPokemon1 || !selectedPokemon2) {
      setError('Please select both Pokemon');
      return;
    }

    if (selectedPokemon1 === selectedPokemon2) {
      setError('Please select different Pokemon');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await api.battle(selectedPokemon1, selectedPokemon2);
      setBattleResult(result);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Battle failed');
    } finally {
      setLoading(false);
    }
  };

  const getSelectedPokemonData = (name: string) => {
    return pokemon.find(p => p.name === name);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>
        Pokemon Battle Simulator
      </h1>
      
      <div style={{ 
        display: 'flex',
        flexDirection: 'row',
        gap: '20px',
        marginBottom: '20px' 
      }}>
        <PokemonSelector
          title="Pokemon 1"
          selectedPokemon={selectedPokemon1}
          onPokemonSelect={(pokemonName) => {
            setSelectedPokemon1(pokemonName);
            setBattleResult(null);
          }}
          pokemon={pokemon}
          getSelectedPokemonData={getSelectedPokemonData}
        />
        
        <PokemonSelector
          title="Pokemon 2"
          selectedPokemon={selectedPokemon2}
          onPokemonSelect={(pokemonName) => {
            setSelectedPokemon2(pokemonName);
            setBattleResult(null);
          }}
          pokemon={pokemon}
          getSelectedPokemonData={getSelectedPokemonData}
        />
      </div>

      {/* Battle Button */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button 
          onClick={handleBattle} 
          disabled={loading || !selectedPokemon1 || !selectedPokemon2}
        >
          {loading ? 'Battling...' : 'BATTLE'}
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div style={{ 
          color: '#dc3545', 
        }}>
          {error}
        </div>
      )}

      {(battleResult && !error) && (
        <div style={{ 
        }}>
          <h2>Battle Result</h2>
          <h3>
            Winner: {battleResult.winner}!
          </h3>
          <p>
            {battleResult.explanation}
          </p>

          {battleResult.battleScore && (
            <div>
              <h4>Battle Scores:</h4>
              <p>
                {selectedPokemon1}: {Math.round(battleResult.battleScore.pokemon1Score)}
              </p>
              <p>
                {selectedPokemon2}: {Math.round(battleResult.battleScore.pokemon2Score)}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BattleSimulator;
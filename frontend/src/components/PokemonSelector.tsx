import React from 'react';
import { Pokemon } from '../types/Pokemon';

interface PokemonSelectorProps {
  title: string;
  selectedPokemon: string;
  onPokemonSelect: (pokemonName: string) => void;
  pokemon: Pokemon[];
  getSelectedPokemonData: (name: string) => Pokemon | undefined;
}

const PokemonSelector: React.FC<PokemonSelectorProps> = ({
  title,
  selectedPokemon,
  onPokemonSelect,
  pokemon,
  getSelectedPokemonData
}) => {
  return (
    <div>
      <h3>{title}</h3>
      <select 
        value={selectedPokemon} 
        onChange={(e) => onPokemonSelect(e.target.value)}
      >
        <option value="">Choose Pokemon</option>
        {pokemon.map(p => (
          <option key={p.id} value={p.name}>
            {p.name}
          </option>
        ))}
      </select>
      
      {selectedPokemon && (
        <div>
          {(() => {
            const pokemonData = getSelectedPokemonData(selectedPokemon);
            return pokemonData ? (
              <div style={{ padding: 10 }}>
                <img 
                  src={pokemonData.img} 
                  alt={pokemonData.name}
                />
                <p>
                  Type: {pokemonData.type.join(', ')}
                </p>
              </div>
            ) : null;
          })()}
        </div>
      )}
    </div>
  );
};

export default PokemonSelector; 
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import BattleSimulator from './BattleSimulator';

// Mock the API service
jest.mock('../services/api', () => ({
  api: {
    getPokemon: jest.fn(() => Promise.resolve([])),
    battle: jest.fn(() => Promise.resolve({}))
  }
}));

describe('BattleSimulator', () => {
  // Component Test: Test that Pokemon selection renders and battle button works
  it('should render Pokemon selectors and battle button', async () => {
    render(<BattleSimulator />);

    // Wait for the component to finish loading Pokemon data
    await waitFor(() => {
      expect(screen.getByText('Pokemon 1')).toBeInTheDocument();
    });

    // Check that Pokemon selectors are rendered
    expect(screen.getByText('Pokemon 1')).toBeInTheDocument();
    expect(screen.getByText('Pokemon 2')).toBeInTheDocument();
    
    // Check that battle button is rendered
    expect(screen.getByText('BATTLE')).toBeInTheDocument();
    
    // Check that the main title is rendered
    expect(screen.getByText('Pokemon Battle Simulator')).toBeInTheDocument();
  });
}); 
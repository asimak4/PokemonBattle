# Pokemon Battle Simulator - Backend

## Overview
A Node.js/Express backend for simulating Pokemon battles


## API Endpoints

### POST /api/battle
Simulates a battle between two Pokemon.


### GET /api/pokemon
Returns a list of all available Pokemon.

## Battle System

The battle system uses a scoring algorithm that considers:
- **Type Effectiveness**: Fire > Grass, Water > Fire, Grass > Water (2x multiplier)
- **Randomness**: Adds 0-50 points to prevent completely predictable outcomes
- **Base Score**: Each Pokemon starts with 100 points

## Testing

### Running Tests
```
npm test
```


### Installation
```
npm install
```

### Starting backend
```
npm run build
npm start
```
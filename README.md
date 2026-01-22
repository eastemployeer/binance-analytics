
# Binance Analytics

  

A Node.js/Express API that fetches data for a desired symbol and analyzes prices movement (for each market candle and overall in inputted time range)

  

## Prerequisites

  

-  **Node.js** 20+ (for local development)

  

## Getting Started

  

### Run Locally

  

1. Install dependencies:

  

```bash

npm  install

```

  

2. Start the development server:

  

```bash

npm  run  dev

```

  

Or with hot reload:

  

```bash

npm  run  dev:hot

```

  

The API will be available at `http://localhost:3000`.

  

## Available Scripts

  

| Script | Description |

|--------|-------------|

| `npm run dev` | Start development server |

| `npm run dev:hot` | Start development server with hot reload |

| `npm test` | Run tests |

  
  
  

## API Endpoints

  

### `/api/symbol-price-analysis`

  

Query params:

  

-  `interval` - e.g. '1m', '5m'

-  `symbol` - e.g. 'ETHBTC',

-  `startTime` - in UNIX timestamp format (optional)

-  `endTime` - in UNIX timestamp format (optional)


Example request:
`http://localhost:3001/api/symbol-price-analysis?symbol=ETHBTC&interval=5m&startTime=1762819200000`

Example response:
```
{
  "overall": {
    "priceDirection": "up",
    "absoluteChange": 0.000109999999999998,
    "percentageChange": 0.326894502228823,
    "actualStartTime": "2025-11-11T00:00:00.000Z",
    "actualEndTime": "2025-11-12T17:39:59.999Z",
    "requestedStartTime": "2025-11-11T00:00:00.000Z",
    "requestedEndTime": null
  },
  "candles": [
    {
      "priceDirection": "up",
      "absoluteChange": 0.000019999999999999,
      "percentageChange": 0.0594353640416023
    },
    ....
```

## Important Note

I chose to use candles data to complete this task. Because of that requested time range can differ from the actually fetched time range. Because of that. I've added `requestedStartTime`, `requestedEndTime` and `actualStartTime`, `actualEndTime` to the response. 
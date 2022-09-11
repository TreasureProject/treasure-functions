# Treasure Functions

Serverless functions for the Treasure ecosystem

## Development

### Pre-requisites

- Node v14+

### Setup

Install dependencies:

```sh
npm install
```

Create an environment variables file based off the example and fill in with your values:

```sh
cp .env.example .env
```

### Run

Invoke any function locally by replacing `functionName` in the following command:

```sh
serverless invoke local -f functionName
```

### Deploy

Merge changes to `main` branch to automatically deploy to Treasure's AWS instance via GitHub Actions. Changes will be visible in ~5 minutes after cache expires.

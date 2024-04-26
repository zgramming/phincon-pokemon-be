# RESTful API Node Express

The project builds RESTful APIs using Node.js, Express for PokeAPI

## Manual Installation

```bash
git clone https://github.com/zgramming/phincon-pokemon-be.git
cd phincon-pokemon-be
```

Install the dependencies:

```bash
npm install
```

## Table of Contents

- [Commands](#commands)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)

## Commands

Running in development:

```bash
npm run dev
```

Running in production:

```bash
# build
npm run build
# start
npm run start
```

### API Endpoints

List of available routes:

**Pokemon**:\
`POST api/v1/pokemon/catch/:name` - Catch Pokemon\
`PUT api/v1/pokemon/rename/:name` - Rename Pokemon\
`DEL api/v1/pokemon/release/:name` - Release Pokemon
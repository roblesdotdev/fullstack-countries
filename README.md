# Full Stack countries

Countries PI FullStack

## Dev Server

### Run PostgreSQL instance locally with docker-compose

```
$ DB_NAME=countriesdb DB_USER=worm DB_PASSWORD=secret docker-compose up -d
```

### Exec psql

```
$ docker-compose run db bash
# psql --host=db --username=worm --dbname=countriesdb
```

### Env

```
$ mv server/.env-sample server/.env
```

### Run

```
$ yarn dev
```

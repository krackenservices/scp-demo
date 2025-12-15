# Demo Database

PostgreSQL database for the SCP demo application.

## Local Development

Using Docker:

```bash
docker run -d \
  --name demo-postgres \
  -e POSTGRES_USER=demo \
  -e POSTGRES_PASSWORD=demo \
  -e POSTGRES_DB=demo \
  -p 5432:5432 \
  -v $(pwd)/init.sql:/docker-entrypoint-initdb.d/init.sql \
  postgres:16-alpine
```

## Schema

See [init.sql](./init.sql) for the database schema.

## Connection

```
DATABASE_URL=postgres://demo:demo@localhost:5432/demo
```

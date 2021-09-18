#!/usr/bin/env ash

until pg_isready && psql -l | grep -wc ${POSTGRES_DB}; do
  sleep 10
done

psql ${POSTGRES_DB} < /var/tmp/pg/seed.psql

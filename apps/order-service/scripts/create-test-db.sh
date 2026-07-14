#!/bin/bash
  set -euo pipefail

  DB_NAME="${ORDER_SERVICE_TEST_DATABASE_NAME:-commerce_test}"

  if docker-compose -f ../../docker-compose.yml exec -T postgres psql -U commerce -d postgres -tAc "SELECT 1 FROM pg_database WHERE datname = '${DB_NAME}'" | grep -q 1; then
    echo "Database ${DB_NAME} already exists"
  else
    docker-compose -f ../../docker-compose.yml exec -T postgres createdb -U commerce "${DB_NAME}"
    echo "Database ${DB_NAME} created"
  fi

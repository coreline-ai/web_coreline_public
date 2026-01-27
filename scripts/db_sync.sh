#!/bin/bash

# Script to automatically generate and apply migrations
# Usage: ./scripts/db_sync.sh "Description of changes"

DESCRIPTION=$1

if [ -z "$DESCRIPTION" ]; then
    echo "❌ Error: Please provide a description for the migration."
    echo "Usage: ./scripts/db_sync.sh \"Description of changes\""
    exit 1
fi

echo "🔄 Generating migration..."
export NEON_DATABASE_URL=$(grep NEON_DATABASE_URL .env | cut -d '=' -f2)
alembic revision --autogenerate -m "$DESCRIPTION"

if [ $? -eq 0 ]; then
    echo "✅ Migration generated."
    echo "🔄 Applying migration..."
    alembic upgrade head
    if [ $? -eq 0 ]; then
        echo "✅ Database synced successfully!"
    else
        echo "❌ Error applying migration."
        exit 1
    fi
else
    echo "❌ Error generating migration. Check your models."
    exit 1
fi

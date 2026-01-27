
import asyncio
from logging.config import fileConfig
import os
import sys

# Add project root to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Import db models
from api._lib.db import Base
from api._lib.models import * # Import all models to register them with Base

from sqlalchemy import pool
from sqlalchemy.ext.asyncio import async_engine_from_config
from alembic import context

# this is the Alembic Config object, which provides
# access to the values within the .ini file in use.
config = context.config

# Interpret the config file for Python logging.
# This line sets up loggers basically.
if config.config_file_name is not None:
    fileConfig(config.config_file_name)


# Override sqlalchemy.url with environment variable
NEON_URL = os.environ.get("NEON_DATABASE_URL") or os.environ.get("DATABASE_URL")
if NEON_URL:
    # Handle sslmode/channel_binding/asyncpg
    if NEON_URL.startswith("postgres://"):
        NEON_URL = NEON_URL.replace("postgres://", "postgresql+asyncpg://", 1)
    elif NEON_URL.startswith("postgresql://"):
        NEON_URL = NEON_URL.replace("postgresql://", "postgresql+asyncpg://", 1)
    
    if "?" in NEON_URL:
        base_url, params = NEON_URL.split("?", 1)
        param_list = params.split("&")
        filtered_params = [p for p in param_list if not p.startswith("sslmode=") and not p.startswith("channel_binding=")]
        NEON_URL = base_url + ("?" + "&".join(filtered_params) if filtered_params else "")
        
    config.set_main_option("sqlalchemy.url", NEON_URL)
else:
    # Fallback for local dev if env var missing (or error out)
    # Ideally we should error if we can't find a DB
    print("WARNING: NEON_DATABASE_URL or DATABASE_URL not set. Migrations may fail if not using alembic.ini url.")

# add your model's MetaData object here
# for 'autogenerate' support
target_metadata = Base.metadata


def process_revision_directives(context, revision, directives):
    if config.cmd_opts and config.cmd_opts.autogenerate:
        script = directives[0]
        if script.upgrade_ops.is_empty():
            directives[:] = []
            print('✅ No schema changes detected (skipping migration generation).')

def run_migrations_offline() -> None:
    """Run migrations in 'offline' mode.

    This configures the context with just a URL
    and not an Engine, though an Engine is acceptable
    here as well.  By skipping the Engine creation
    we don't even need a DBAPI to be available.

    Calls to context.execute() here emit the given string to the
    script output.

    """
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
        process_revision_directives=process_revision_directives, 
    )

    with context.begin_transaction():
        context.run_migrations()


def do_run_migrations(connection):
    context.configure(
        connection=connection, 
        target_metadata=target_metadata,
        process_revision_directives=process_revision_directives,
    )

    with context.begin_transaction():
        context.run_migrations()


async def run_async_migrations():
    """In this scenario we need to create an Engine
    and associate a connection with the context.

    """

    connectable = async_engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    async with connectable.connect() as connection:
        await connection.run_sync(do_run_migrations)

    await connectable.dispose()


def run_migrations_online() -> None:
    """Run migrations in 'online' mode."""

    asyncio.run(run_async_migrations())


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()

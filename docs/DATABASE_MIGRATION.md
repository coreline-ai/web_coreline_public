# Database Migration Guide (Alembic)

This project uses **Alembic** to manage database schema changes, ensuring consistency between local development and the production environment (Neon DB).

## Workflow

### 1. Make Changes to Models (Local)
Modify your SQLAlchemy models in `api/_lib/models.py`.
- Add new tables
- Add/Remove columns
- Change column types

### 2. Generate Migration File
After saving your changes to `models.py`, run this command to generate a migration script. Alembic will automatically detect the differences between your code and the database.

```bash
alembic revision --autogenerate -m "Description of changes"
```
*Example: `alembic revision --autogenerate -m "Add post_likes table"`*

This creates a new python file in `api/migrations/versions/`.

### 3. Apply Migrations
To apply the changes to the database (both local and production), run:

```bash
alembic upgrade head
```

## Common Commands

- **Check current DB revision:**
  ```bash
  alembic current
  ```

- **View migration history:**
  ```bash
  alembic history
  ```

- **Downgrade (Undo last migration):**
  ```bash
  alembic downgrade -1
  ```

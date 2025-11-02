Backend (Express + TypeScript)

Scripts
- setup: Automatically set up database (creates DB, runs migrations, and seeds)
- dev: Start dev server with ts-node-dev
- build: Compile TypeScript to dist
- start: Run compiled server
- db:ensure: Create database if it doesn't exist (MySQL/PostgreSQL only)
- migrate: Run latest database migrations
- seed: Seed initial data (admin user)

Environment variables
Copy these into a .env file in backend/:

NODE_ENV=development
PORT=4000
JWT_SECRET=please-change-me-in-production
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123

# For SQLite (default)
DB_CLIENT=sqlite3
DB_URL=file:./dev.db

# For MySQL
# DB_CLIENT=mysql2
# DB_URL=mysql://root:4321@localhost:3306/chatbot

Database switching
- sqlite3 (default): DB_URL=file:./dev.db
- PostgreSQL: DB_CLIENT=pg, DB_URL=postgres://user:pass@localhost:5432/dbname
- MySQL: DB_CLIENT=mysql2, DB_URL=mysql://user:pass@localhost:3306/dbname
- MSSQL: DB_CLIENT=mssql, DB_URL=mssql://user:pass@localhost:1433/dbname

Install extra client packages if switching:
- PostgreSQL: npm i pg
- MySQL: npm i mysql2 (already installed)
- MSSQL: npm i mssql

Setup (Automated - Recommended)
1. npm install
2. npm run setup (automatically creates database, runs migrations, and seeds)
3. npm run dev

Setup (Manual Steps - Alternative)
For MySQL:
1. npm install
2. npm run db:ensure (creates the database)
3. npm run migrate (creates tables)
4. npm run seed (creates admin user)
5. npm run dev

For SQLite (default):
1. npm install
2. npm run migrate
3. npm run seed
4. npm run dev

Auth Endpoints
- POST /api/auth/register { email, password, name? } -> { token, user }
  Creates a new user account
- POST /api/auth/login { email, password } -> { token, user }
  Authenticates user and returns JWT token
  Seeded admin user uses ADMIN_EMAIL and ADMIN_PASSWORD.



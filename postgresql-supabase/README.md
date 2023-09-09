# PostgreSQL example using Supabase

Connect to a PostgreSQL database on [Supabase](https://supabase.com/) using Prisma, and use [Prisma Migrate](https://www.prisma.io/docs/guides/migrate)

## How to use

```
npm run migrate-diff ${migrationName}
```

### 2. Set up Supabase


In the `.env` file add the:
`DATABASE_URL=postgresql://postgres:[PASSWORD].vityhzsxcycxasojifxd.supabase.co:5432/postgres` - [Password generated from](https://supabase.com/dashboard/project/vityhzsxcycxasojifxd/settings/database)

#### Using a local development environment

If you have the Supabase CLI locally installed and have logged in, run the following command to start up Supabase

```sh
npx supabase start
```

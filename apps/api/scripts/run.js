const { isKnownEnv } = require('./tools/cmd');
const { create_db } = require('./tools/create-db');
const { create_migration } = require('./create-migration');
const { run_migration } = require('./tools/run-migration');
const { seed_db } = require('./tools/seed-db');

const args = process.argv.slice(2).join(' ');
const tokens = args.split(' ');

const env = tokens[0]; // expects e.g development, production, staging etc... check ./tools/cmd.js for all allowed
const createdb = tokens.includes('createdb');
const gen = tokens.includes('gen');
const migrate = tokens.includes('migrate');
const seed = tokens.includes('seed');

if (!isKnownEnv(env)) {
  console.error('invalid environment');
  process.exit(1);
}

/**
 * Builds and returns an array of database operations to execute based on command-line flags.
 * This function parses the environment and flags (createdb, gen, migrate, seed) and
 * creates an array of async functions that will be executed sequentially.
 *
 * Supported operations:
 * - createdb: Creates the database if it doesn't exist
 * - gen: Generates a new migration file based on schema changes
 * - migrate: Runs pending database migrations
 * - seed: Seeds the database with initial data
 *
 * @param {string} env - The environment name (must be a known environment)
 * @returns {Array<Function>} Array of async functions representing operations to execute
 */
const get_options = (env) => {
  const env_file = `.env`; // change this whenever you need to
  const log_file = `logs/`;
  const datasource = `./scripts/datasource.ts`; // note its relative to the directory, basically __dirname
  const migrations = `./scripts/migrations/MIG-${Date.now()}`;
  const seed_files = `./scripts/seeder.ts`;

  const envs = {
    ENV_FILE: env_file,
    LOG_PATH: log_file,
  };

  const operations = [];

  operations.push(async () => {
    if (createdb) {
      await create_db(datasource, envs);
    }
  });

  operations.push(async () => {
    if (gen) {
      await create_migration(datasource, migrations, envs);
    }
  });

  operations.push(async () => {
    if (migrate) {
      await run_migration(datasource, envs);
    }
  });

  operations.push(async () => {
    if (seed) {
      await seed_db(seed_files, envs);
    }
  });

  return operations;
};

void (async () => {
  try {
    const operations = get_options(env);
    for (const operation of operations) {
      await operation();
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();

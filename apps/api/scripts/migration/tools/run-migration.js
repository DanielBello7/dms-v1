const { run } = require('./cmd');

/**
 * Executes pending database migrations using TypeORM CLI.
 * This function runs all pending migrations in order to update the database
 * schema to match the latest migration files.
 *
 * @param {string} datasource - Path to the TypeORM datasource configuration file
 * @param {Object} envs - Environment variables to pass to the command
 * @returns {Promise<void>} Resolves when all migrations complete successfully
 * @throws {Error} Rejects if any migration fails to execute
 */
const run_migration = async (datasource, envs) => {
  await run(
    'npx',
    [
      'ts-node',
      '-r',
      'tsconfig-paths/register',
      '--project',
      './tsconfig.json',
      './node_modules/typeorm/cli',
      'migration:run',
      '-d',
      datasource,
    ],
    envs,
  );
};

module.exports = { run_migration };

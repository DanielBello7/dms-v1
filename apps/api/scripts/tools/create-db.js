const { run } = require('./cmd');

/**
 * Creates a new PostgreSQL database using TypeORM extension.
 * This function will create the database if it doesn't exist, using the
 * specified datasource configuration and environment variables.
 *
 * @param {string} datasource - Path to the TypeORM datasource configuration file
 * @param {Object} env - Environment variables to pass to the command
 * @returns {Promise<void>} Resolves when database creation completes successfully
 * @throws {Error} Rejects if database creation fails
 */
const create_db = async (datasource, env) => {
  await run(
    'npx',
    [
      'typeorm-extension',
      'db:create',
      '-d',
      datasource,
      '--initialDatabase',
      'postgres',
      '-s',
      'no',
    ],
    env,
  );
};

module.exports = { create_db };

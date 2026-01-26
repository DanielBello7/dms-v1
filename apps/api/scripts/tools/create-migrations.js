const { run } = require('./cmd');

/**
 * Generates a new TypeORM migration file based on schema changes.
 * This function uses TypeORM CLI to auto-generate migration files by comparing
 * the current database schema with the entity definitions.
 *
 * @param {string} datasource - Path to the TypeORM datasource configuration file
 * @param {string} migration - Path/name for the generated migration file
 * @param {Object} envs - Environment variables to pass to the command
 * @returns {Promise<void>} Resolves when migration generation completes or is skipped
 * @throws {Error} Silently catches errors and logs 'skipping migration generation'
 */
const create_migration = async (datasource, migration, envs) => {
  try {
    await run(
      'npx',
      [
        'ts-node',
        '-r',
        'tsconfig-paths/register',
        '--project',
        './tsconfig.json',
        './node_modules/typeorm/cli',
        '--pretty',
        '-d',
        datasource,
        'migration:generate',
        migration,
      ],
      envs,
    );
  } catch {
    console.log('skipping migration generation');
  }
};

module.exports = { create_migration };

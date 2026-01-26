const { run } = require('./cmd');

/**
 * Seeds the database with initial data by running a seed script.
 * This function executes a TypeScript seed file to populate the database
 * with initial/default data.
 *
 * @param {string} seed_url - Path to the seed TypeScript file to execute
 * @param {Object} envs - Environment variables to pass to the command
 * @returns {Promise<void>} Resolves when seeding completes or is skipped
 * @throws {Error} Silently catches errors and logs 'skipping seeding'
 */
const seed_db = async (seed_url, envs) => {
  try {
    await run(
      'npx',
      ['ts-node', '-r', 'tsconfig-paths/register', seed_url],
      envs,
    );
  } catch {
    console.log('skipping seeding');
  }
};

module.exports = { seed_db };

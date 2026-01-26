const { spawn } = require('child_process');

/**
 * Executes a command with spawn and inherits stdio by default.
 * This function runs a command and resolves/rejects based on the exit code.
 *
 * @param {string} cmd - The command to execute
 * @param {string[]} arg - Array of command arguments
 * @param {Object} env - Environment variables to merge with process.env
 * @param {Object} [options] - Additional spawn options
 * @param {string|Array} [options.stdio='inherit'] - Stdio configuration
 * @param {boolean} [options.shell=false] - Whether to run in shell
 * @param {string} [options.cwd] - Working directory for the command
 * @returns {Promise<number>} Resolves with exit code 0 on success
 * @throws {Error} Rejects with error if command exits with non-zero code
 */
const run = (cmd, arg, env, options) => {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, arg, {
      stdio: options?.stdio ?? 'inherit',
      shell: options?.shell ?? false,
      cwd: options?.cwd,
      env: {
        ...process.env,
        ...env,
      },
    });

    child.on('exit', (code) => {
      if (code === 0) resolve(code);
      else reject(new Error(`command exited with code ${code}`));
    });
  });
};

/**
 * Executes a command and captures stdout/stderr output.
 * Unlike `run`, this function collects the command output and returns it.
 *
 * @param {string} cmd - The command to execute
 * @param {string[]} arg - Array of command arguments
 * @param {Object} env - Environment variables to merge with process.env
 * @returns {Promise<{stdout: string, stderr: string, code: number}>} Resolves with command output and exit code
 * @throws {Error} Rejects with error message including stderr if command fails
 */
const cmd = (cmd, arg, env) => {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, arg, {
      shell: false,
      env: {
        ...process.env,
        ...env,
      },
    });

    let stdout = '';
    let stderr = '';

    child.stdout?.on('data', (data) => {
      stdout += data.toString();
    });

    child.stderr?.on('data', (data) => {
      stderr += data.toString();
    });

    child.on('close', (code) => {
      if (code === 0) resolve({ stdout, stderr, code });
      else reject(new Error(`command failed with code ${code}\n${stderr}`));
    });
  });
};

/**
 * List of valid environment names that can be used in migration scripts.
 * @type {string[]}
 */
const known_envs = [
  'development',
  'local',
  'production',
  'staging',
  'container',
];

/**
 * Checks if the provided value is a known/valid environment name.
 *
 * @param {string} value - The environment name to validate
 * @returns {boolean} True if the environment is known, false otherwise
 */
function isKnownEnv(value) {
  return known_envs.includes(value);
}

/**
 * Checks if the provided app name is a known seedable application.
 * Valid seed apps: 'finance', 'navigation', 'user'
 *
 * @param {string} app - The application name to validate
 * @returns {boolean} True if the app is known and can be seeded, false otherwise
 */
function isKnownSeed(app) {
  return ['finance', 'navigation', 'user'].includes(app);
}

module.exports = {
  run,
  cmd,
  known_envs,
  isKnownEnv,
  isKnownSeed,
};

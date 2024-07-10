module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    globals: {
        'ts-jest': {
        tsconfig: 'tsconfig.json'
        }
    }
  };
  
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleDirectories: ['node_modules', '<rootDir>'],
    modulePaths: ['<rootDir>'],
    moduleNameMapper: {
        '^src/(.*)$': '<rootDir>/src/$1',
        '^controllers/(.*)$': '<rootDir>/src/controllers/$1',
        '^services/(.*)$': '<rootDir>/src/services/$1',
        '^repositories/(.*)$': '<rootDir>/src/repositories/$1',
        '^utils/(.*)$': '<rootDir>/src/utils/$1',
        '^interfaces/(.*)$': '<rootDir>/src/interfaces/$1',
        '^models/(.*)$': '<rootDir>/src/models/$1'
    },
    transform: {
        '^.+\\.tsx?$': ['ts-jest', {
            isolatedModules: true,
        }]
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
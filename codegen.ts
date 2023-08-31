import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: './mobile/src/gql/schema.graphql',
    documents: ['./mobile/src/**/*.tsx', '!./mobile/src/gql/**/*'],
    generates: {
        './mobile/src/gql/': {
            preset: 'client',
            plugins: [],
        },
    },
};

export default config;

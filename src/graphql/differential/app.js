import graphqlHTTP from 'express-graphql';
import { GraphQLSchema } from 'graphql';

import queries from './query';

const differentialQuery = new GraphQLSchema({
    query: queries,
});

export default (expressApp) => {
    expressApp.use(
        '/diff',
        graphqlHTTP({
            schema: differentialQuery,
            graphiql: true,
        }),
    );
}

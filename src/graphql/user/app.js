import { GraphQLSchema } from 'graphql';
import graphqlHTTP from 'express-graphql';

import query from './query';

const userSchema = new GraphQLSchema({ query });

export default (expressApp) => {
    expressApp.use(
        '/user',
        graphqlHTTP({
            schema: userSchema,
            graphiql: true,
        }),
    );
}

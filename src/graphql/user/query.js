import {
    GraphQLObjectType,
    GraphQLList,
    GraphQLID,
    GraphQLString,
} from 'graphql';

import userType from './type/user';
import * as repository from './repository/user';

const Query = new GraphQLObjectType({
    name: 'UserQuery',
    description: 'Realize Root Query',
    fields: () => ({
        user: {
            type: userType,
            args: {
                id: {
                    type: GraphQLID,
                },
                phid: {
                    type: GraphQLString,
                },
                userName: {
                    type: GraphQLString,
                }
            },
            resolve: repository.user,
        },
        users: {
            type: new GraphQLList(userType),
            resolve: repository.users,
        }
    }),
});

export default Query;

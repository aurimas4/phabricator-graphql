import {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
} from 'graphql';

import { userType } from '../../user';
import * as repository from '../repository/diff';

const diffType = new GraphQLObjectType({
    name: 'Diff',
    description: 'Differential.Diff',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLID) },
        phid: {
            type: GraphQLString,
            resolve: ({ dataValues: { phid } }) => phid.toString('utf8'),
        },
        dateCreated: { type: GraphQLInt },
        dateModified: { type: GraphQLInt },
        author: {
            type: userType,
            resolve: repository.user,
        },
    }),
});

export default diffType;

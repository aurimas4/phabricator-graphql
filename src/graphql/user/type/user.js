import {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
    GraphQLList,
} from 'graphql';

import { User } from '../../../config/db';

import { diffType, revisionType, transactionType } from '../../differential';

import * as repository from '../repository/user';

const userType = new GraphQLObjectType({
    name: 'User',
    description: 'User object',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLID) },
        phid: {
            type: GraphQLString,
            resolve: ({ dataValues: { phid } }) => phid.toString('utf8'),
        },
        userName: { type: GraphQLString },
        realName: { type: GraphQLString },
        diffs: {
            type: new GraphQLList(diffType),
            resolve: repository.diffs,
        },
        revisions: {
            type: new GraphQLList(revisionType),
            resolve: repository.revisions,
        },
        transactions: {
            type: new GraphQLList(transactionType),
            resolve: repository.transactions,
        }
    }),
});

export default userType;

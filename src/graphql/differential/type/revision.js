import {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
} from 'graphql';

import { userType } from '../../user';
import * as repository from '../repository/revision';
import transactionType from './transaction';
import diffType from './diff';

const revisionType = new GraphQLObjectType({
    name: 'Revision',
    description: 'Differential.Revision',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLString },
        phid: {
            type: GraphQLString,
            resolve: ({ dataValues: { phid } }) => phid.toString('utf8'),
        },
        status: { type: GraphQLString },
        author: {
            type: userType,
            resolve: repository.user,
        },
        dateCreated: { type: GraphQLInt },
        dateModified: { type: GraphQLInt },
        activeDiffPHID: { type: GraphQLString },
        transactions: {
            type: new GraphQLList(transactionType),
            resolve: repository.transactions,
        },
        diffs: {
            type: new GraphQLList(diffType),
            resolve: repository.diffs,
        }
    })
});

export default revisionType;

import {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
} from 'graphql';

import { userType } from '../../user';
import * as repository from '../repository/transaction';
import diffType from './diff';
import revisionType from './revision';

const transactionType = new GraphQLObjectType({
    name: 'Transaction',
    description: 'Differential.Transaction',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLID) },
        phid: {
            type: GraphQLString,
            resolve: ({ dataValues: { phid } }) => phid.toString('utf8'),
        },
        author: {
            type: userType,
            resolve: repository.user,
        },
        objectPHID: { type: diffType },
        transactionType: { type: GraphQLString },
        oldValue: { type: GraphQLString },
        newValue: { type: GraphQLString },
        dateCreated: { type: GraphQLInt },
        dateModified: { type: GraphQLInt },
        revision: {
            type: revisionType,
            resolve: repository.revision,
        },
    }),
});

export default transactionType;

import {
    GraphQLObjectType,
    GraphQLList,
    GraphQLID,
    GraphQLString,
} from 'graphql';

import diffType from './type/diff';
import revisionType from './type/revision';
import transactionType from './type/transaction';

import * as diffRepository from './repository/diff';
import * as revisionRepository from './repository/revision';
import * as transactionRepository from './repository/transaction';

const Query = new GraphQLObjectType({
    name: 'DiffQuery',
    description: 'Realize Root Query',
    fields: () => ({
        diff: {
            type: diffType,
            args: {
                id: {
                    type: GraphQLID,
                },
                phid: {
                    type: GraphQLString,
                }
            },
            resolve: diffRepository.diff
        },
        diffs: {
            type: new GraphQLList(diffType),
            resolve: diffRepository.diffs
        },
        revision: {
            type: revisionType,
            args: {
                id: {
                    type: GraphQLID,
                },
                phid: {
                    type: GraphQLString,
                }
            },
            resolve: revisionRepository.revision,
        },
        revisions: {
            type: new GraphQLList(revisionType),
            resolve: revisionRepository.revisions,
        },
        transaction: {
            type: transactionType,
            args: {
                id: {
                    type: GraphQLID,
                }
            },
            resolve: transactionRepository.transaction,
        },
        transactions: {
            type: new GraphQLList(transactionType),
            resolve: transactionRepository.transactions,
        },
    }),
});

export default Query;

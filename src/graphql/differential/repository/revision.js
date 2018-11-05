import { Revision } from '../../../config/db';
import { resolver } from 'graphql-sequelize';

export const revision = resolver(Revision);
export const revisions = resolver(Revision);
export const transactions = resolver(Revision.Transactions);
export const diffs = resolver(Revision.Diffs);
export const user = resolver(Revision.User);

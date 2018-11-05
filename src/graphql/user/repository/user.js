import { User } from '../../../config/db';
import { resolver } from 'graphql-sequelize';

export const user = resolver(User);
export const users = resolver(User);
export const diffs = resolver(User.Diffs);
export const revisions = resolver(User.Revisions);
export const transactions = resolver(User.Transactions);

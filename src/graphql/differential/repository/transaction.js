import { Transaction } from '../../../config/db';
import { resolver } from 'graphql-sequelize';

export const transaction = resolver(Transaction);
export const transactions = resolver(Transaction);
export const revision = resolver(Transaction.Revision);
export const user = resolver(Transaction.User);

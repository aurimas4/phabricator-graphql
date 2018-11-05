import { Diff } from '../../../config/db';
import { resolver } from 'graphql-sequelize';

export const diff = resolver(Diff);
export const diffs = resolver(Diff);
export const user = resolver(Diff.User);

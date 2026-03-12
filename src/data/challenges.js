import { design, optimization, transactions, business } from './challenges_extra';
import { proChallenges } from './challenges_pro';

// Combined Business Category
const allBusiness = [...business, ...proChallenges];

export const challengeCategories = [
  { id: 'basic', title: 'Basic Queries', count: basic.length, icon: '📝' },
  { id: 'filtering', title: 'Filtering & Conditions', count: filtering.length, icon: '🔍' },
  { id: 'aggregation', title: 'Aggregation', count: aggregation.length, icon: '📊' },
  { id: 'joins', title: 'Joins', count: joins.length, icon: '🔗' },
  { id: 'subqueries', title: 'Subqueries', count: subqueries.length, icon: '🧩' },
  { id: 'window', title: 'Window Functions', count: windowFunctions.length, icon: '🪟' },
  { id: 'design', title: 'Database Design', count: design.length, icon: '🏗️' },
  { id: 'optimization', title: 'Query Optimization', count: optimization.length, icon: '⚡' },
  { id: 'transactions', title: 'Transactions', count: transactions.length, icon: '🔒' },
  { id: 'business', title: 'Professional & Business', count: allBusiness.length, icon: '💼' }
];

export const challenges = [
  ...basic,
  ...filtering,
  ...aggregation,
  ...joins,
  ...subqueries,
  ...windowFunctions,
  ...design,
  ...optimization,
  ...transactions,
  ...allBusiness
];

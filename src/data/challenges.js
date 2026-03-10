// Unified SQL Challenge Bank — 500+ challenges across 10 categories
import { basic } from './challenges_basic';
import { filtering, aggregation, joins, subqueries, windowFunctions } from './challenges_advanced';
import { design, optimization, transactions, business } from './challenges_extra';

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
  { id: 'business', title: 'Real Business Problems', count: business.length, icon: '💼' }
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
  ...business
];

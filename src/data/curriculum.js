// Comprehensive SQL Curriculum Data for 220+ Lessons
export const curriculumData = [
    {
        level: 0,
        id: 'level-0',
        title: 'Data & Database Foundations',
        subtitle: 'Absolute Beginner (15 Lessons)',
        description: 'Understand what databases are and why SQL exists.',
        icon: 'Database',
        modules: [
            {
                id: 'm1',
                title: 'Introduction to Data',
                topics: [
                    'What is data',
                    'Types of data',
                    'Structured vs unstructured data',
                    'Evolution of databases',
                    'File systems vs databases'
                ]
            },
            {
                id: 'm2',
                title: 'Database Management Systems',
                topics: [
                    'What is DBMS',
                    'What is RDBMS',
                    'Examples of DBMS',
                    'SQL history',
                    'SQL standards'
                ]
            },
            {
                id: 'm3',
                title: 'Architecture & Models',
                topics: [
                    'SQL dialects',
                    'Database architecture',
                    'Client-server model',
                    'OLTP vs OLAP',
                    'Relational vs NoSQL databases'
                ]
            }
        ]
    },
    {
        level: 1,
        id: 'level-1',
        title: 'SQL Basics',
        subtitle: 'Foundation Level (25 Lessons)',
        description: 'Writing your first SQL queries.',
        icon: 'Terminal',
        modules: [
            {
                id: 'm4',
                title: 'SQL Syntax & Schema',
                topics: [
                    'SQL syntax basics',
                    'SQL keywords',
                    'SQL statements',
                    'Database schema',
                    'Tables and rows'
                ]
            },
            {
                id: 'm5',
                title: 'Data Types',
                topics: [
                    'Data types overview',
                    'Numeric data types',
                    'String data types',
                    'Date and time types',
                    'Boolean types'
                ]
            },
            {
                id: 'm6',
                title: 'Table Operations',
                topics: [
                    'CREATE DATABASE',
                    'CREATE TABLE',
                    'INSERT INTO',
                    'SELECT basics',
                    'SELECT specific columns'
                ]
            },
            {
                id: 'm7',
                title: 'Basic Filtering',
                topics: [
                    'SELECT DISTINCT',
                    'LIMIT & OFFSET',
                    'WHERE clause',
                    'Comparison operators',
                    'Logical operators'
                ]
            },
            {
                id: 'm8',
                title: 'Advanced Filtering & Sorting',
                topics: [
                    'IN operator',
                    'BETWEEN',
                    'LIKE operator',
                    'Wildcards',
                    'ORDER BY'
                ]
            }
        ]
    },
    {
        level: 2,
        id: 'level-2',
        title: 'Data Manipulation',
        subtitle: 'Table Management (20 Lessons)',
        description: 'Modifying data and table structures.',
        icon: 'RotateCcw',
        modules: [
            {
                id: 'm9',
                title: 'CRUD & DDL',
                topics: [
                    'UPDATE statement',
                    'DELETE statement',
                    'TRUNCATE',
                    'ALTER TABLE',
                    'ADD column'
                ]
            },
            {
                id: 'm10',
                title: 'Modifying Structures',
                topics: [
                    'DROP column',
                    'MODIFY column',
                    'Rename table',
                    'Rename column',
                    'Constraints overview'
                ]
            },
            {
                id: 'm11',
                title: 'Keys & Constraints',
                topics: [
                    'PRIMARY KEY',
                    'FOREIGN KEY',
                    'UNIQUE',
                    'NOT NULL',
                    'CHECK constraint'
                ]
            },
            {
                id: 'm12',
                title: 'Advanced Keys',
                topics: [
                    'DEFAULT values',
                    'Auto increment',
                    'Composite keys',
                    'Surrogate keys',
                    'Natural keys'
                ]
            }
        ]
    },
    {
        level: 3,
        id: 'level-3',
        title: 'Querying Data Deeply',
        subtitle: 'Aggregations & Logic (20 Lessons)',
        description: 'Diving into data analysis.',
        icon: 'BarChart',
        modules: [
            {
                id: 'm13',
                title: 'Basic Aggregates',
                topics: [
                    'Aggregate functions overview',
                    'COUNT',
                    'SUM',
                    'AVG',
                    'MIN'
                ]
            },
            {
                id: 'm14',
                title: 'Grouping Data',
                topics: [
                    'MAX',
                    'GROUP BY',
                    'HAVING',
                    'Multi-column grouping',
                    'Aggregate filtering'
                ]
            },
            {
                id: 'm15',
                title: 'Conditional Logic',
                topics: [
                    'CASE statements',
                    'Conditional logic',
                    'Derived columns',
                    'Expressions in SQL',
                    'NULL handling'
                ]
            },
            {
                id: 'm16',
                title: 'Formatting & Aliases',
                topics: [
                    'COALESCE',
                    'NULLIF',
                    'IFNULL',
                    'Data formatting',
                    'Aliases'
                ]
            }
        ]
    },
    {
        level: 4,
        id: 'level-4',
        title: 'SQL Joins (Critical)',
        subtitle: 'Relational Mastery (20 Lessons)',
        description: 'Connecting the dots between data.',
        icon: 'GitMerge',
        modules: [
            {
                id: 'm17',
                title: 'Join Fundamentals',
                topics: [
                    'Why joins exist',
                    'Relational modeling basics',
                    'INNER JOIN',
                    'LEFT JOIN',
                    'RIGHT JOIN'
                ]
            },
            {
                id: 'm18',
                title: 'Advanced Join Types',
                topics: [
                    'FULL JOIN',
                    'CROSS JOIN',
                    'SELF JOIN',
                    'Multi-table joins',
                    'Join conditions'
                ]
            },
            {
                id: 'm19',
                title: 'Specialized Joins',
                topics: [
                    'Join filtering',
                    'Join performance',
                    'Join vs subquery',
                    'Anti joins',
                    'Semi joins'
                ]
            },
            {
                id: 'm20',
                title: 'Join Optimization',
                topics: [
                    'Natural joins',
                    'Join pitfalls',
                    'Duplicate rows',
                    'Join optimization',
                    'Join debugging'
                ]
            }
        ]
    },
    {
        level: 5,
        id: 'level-5',
        title: 'Subqueries & CTE',
        subtitle: 'Complex Logic (20 Lessons)',
        description: 'Structuring nested and hierarchical queries.',
        icon: 'Layers',
        modules: [
            {
                id: 'm21',
                title: 'Subquery Basics',
                topics: [
                    'Subquery basics',
                    'Scalar subqueries',
                    'Correlated subqueries',
                    'Subqueries in SELECT',
                    'Subqueries in WHERE'
                ]
            },
            {
                id: 'm22',
                title: 'Existential Checks',
                topics: [
                    'Subqueries in FROM',
                    'EXISTS',
                    'NOT EXISTS',
                    'IN vs EXISTS',
                    'WITH clause'
                ]
            },
            {
                id: 'm23',
                title: 'CTE Mastery',
                topics: [
                    'CTE basics',
                    'Recursive CTE',
                    'Hierarchical queries',
                    'Tree structures',
                    'Graph queries'
                ]
            },
            {
                id: 'm24',
                title: 'Advanced Structure',
                topics: [
                    'Nested CTEs',
                    'CTE optimization',
                    'Query refactoring',
                    'Complex query patterns',
                    'Query readability'
                ]
            }
        ]
    },
    {
        level: 6,
        id: 'level-6',
        title: 'Advanced SQL',
        subtitle: 'Analytical Power (25 Lessons)',
        description: 'Professional reporting and analytics.',
        icon: 'Zap',
        modules: [
            {
                id: 'm25',
                title: 'Window Functions Intro',
                topics: [
                    'Window functions intro',
                    'OVER clause',
                    'ROW_NUMBER',
                    'RANK',
                    'DENSE_RANK'
                ]
            },
            {
                id: 'm26',
                title: 'Ranking & Navigation',
                topics: [
                    'NTILE',
                    'LEAD',
                    'LAG',
                    'Running totals',
                    'Moving averages'
                ]
            },
            {
                id: 'm27',
                title: 'Advanced Windowing',
                topics: [
                    'Partitioning window functions',
                    'Ranking use cases',
                    'Analytical queries',
                    'Pivot tables',
                    'Unpivot'
                ]
            },
            {
                id: 'm28',
                title: 'Complex Aggregations',
                topics: [
                    'Advanced aggregations',
                    'GROUPING SETS',
                    'ROLLUP',
                    'CUBE',
                    'Complex analytics'
                ]
            },
            {
                id: 'm29',
                title: 'Time-Series Analysis',
                topics: [
                    'Time-series queries',
                    'Gap detection',
                    'Session analysis',
                    'Top-N queries',
                    'Advanced reporting'
                ]
            }
        ]
    },
    {
        level: 7,
        id: 'level-7',
        title: 'Database Design',
        subtitle: 'System Architecture (20 Lessons)',
        description: 'Designing robust and scalable schemas.',
        icon: 'Layout',
        modules: [
            {
                id: 'm30',
                title: 'Modeling Concepts',
                topics: [
                    'Data modeling basics',
                    'Conceptual models',
                    'Logical models',
                    'Physical models',
                    'ER diagrams'
                ]
            },
            {
                id: 'm31',
                title: 'ER Modeling',
                topics: [
                    'Entities',
                    'Relationships',
                    'Cardinality',
                    'Normalization intro',
                    'First normal form'
                ]
            },
            {
                id: 'm32',
                title: 'Normalization Deep Dive',
                topics: [
                    'Second normal form',
                    'Third normal form',
                    'BCNF',
                    'Denormalization',
                    'Schema design patterns'
                ]
            },
            {
                id: 'm33',
                title: 'Schema Architectures',
                topics: [
                    'Fact tables',
                    'Dimension tables',
                    'Star schema',
                    'Snowflake schema',
                    'Data warehouse modeling'
                ]
            }
        ]
    },
    {
        level: 8,
        id: 'level-8',
        title: 'Performance Engineering',
        subtitle: 'Speed & Scale (20 Lessons)',
        description: 'Optimizing for high-performance apps.',
        icon: 'Activity',
        modules: [
            {
                id: 'm34',
                title: 'Indexing Fundamentals',
                topics: [
                    'Query performance basics',
                    'Indexes intro',
                    'B-tree indexes',
                    'Hash indexes',
                    'Composite indexes'
                ]
            },
            {
                id: 'm35',
                title: 'Advanced Indexing',
                topics: [
                    'Covering indexes',
                    'Index design',
                    'Query planner',
                    'Execution plans',
                    'EXPLAIN ANALYZE'
                ]
            },
            {
                id: 'm36',
                title: 'Query Optimization',
                topics: [
                    'Query optimization',
                    'Slow query debugging',
                    'Database caching',
                    'Materialized views',
                    'Partitioning'
                ]
            },
            {
                id: 'm37',
                title: 'Scaling Strategies',
                topics: [
                    'Horizontal partitioning',
                    'Vertical partitioning',
                    'Sharding',
                    'Read replicas',
                    'Scaling databases'
                ]
            }
        ]
    },
    {
        level: 9,
        id: 'level-9',
        title: 'Transactions & Concurrency',
        subtitle: 'Data Integrity (10 Lessons)',
        description: 'Managing safe concurrent data access.',
        icon: 'Shield',
        modules: [
            {
                id: 'm38',
                title: 'ACID & Transactions',
                topics: [
                    'ACID properties',
                    'Transactions',
                    'COMMIT',
                    'ROLLBACK',
                    'Isolation levels'
                ]
            },
            {
                id: 'm39',
                title: 'Concurrency Issues',
                topics: [
                    'Dirty reads',
                    'Non-repeatable reads',
                    'Phantom reads',
                    'Locking mechanisms',
                    'Deadlocks'
                ]
            }
        ]
    },
    {
        level: 10,
        id: 'level-10',
        title: 'PostgreSQL Deep Dive',
        subtitle: 'Engine Internals (15 Lessons)',
        description: 'Mastering the worlds advanced RDBMS.',
        icon: 'Server',
        modules: [
            {
                id: 'm40',
                title: 'Postgres Core',
                topics: [
                    'PostgreSQL architecture',
                    'Storage engine',
                    'WAL (Write Ahead Log)',
                    'JSONB support',
                    'Arrays in Postgres'
                ]
            },
            {
                id: 'm41',
                title: 'Advanced Search & Index',
                topics: [
                    'Full text search',
                    'Postgres indexes',
                    'GIN indexes',
                    'GiST indexes',
                    'Stored procedures'
                ]
            },
            {
                id: 'm42',
                title: 'Triggers & Tuning',
                topics: [
                    'Triggers',
                    'PL/pgSQL',
                    'VACUUM',
                    'ANALYZE',
                    'Performance tuning'
                ]
            }
        ]
    },
    {
        level: 11,
        id: 'level-11',
        title: 'MongoDB & NoSQL',
        subtitle: 'Distributed Systems (15 Lessons)',
        description: 'Document databases and horizontal scale.',
        icon: 'Globe',
        modules: [
            {
                id: 'm43',
                title: 'BSON & Documents',
                topics: [
                    'NoSQL introduction',
                    'CAP theorem',
                    'MongoDB architecture',
                    'Collections & documents',
                    'BSON format'
                ]
            },
            {
                id: 'm44',
                title: 'Mongo CRUD & Aggs',
                topics: [
                    'CRUD operations',
                    'Query operators',
                    'Aggregation pipeline',
                    'Indexing in MongoDB',
                    'Replication'
                ]
            },
            {
                id: 'm45',
                title: 'Sharding & Integrity',
                topics: [
                    'Sharding',
                    'Transactions in MongoDB',
                    'Schema design',
                    'MongoDB performance',
                    'Real world use cases'
                ]
            }
        ]
    }
];

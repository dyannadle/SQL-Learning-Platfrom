// Sample complete curriculum structure based on the learning path requirements.
export const curriculumData = [
    {
        level: 0,
        id: 'level-0',
        title: 'Database Foundations',
        subtitle: 'Absolute Beginner',
        description: 'Understand what databases are and why SQL exists.',
        icon: 'Database',
        modules: [
            { id: 'm1', title: 'Introduction to Data', topics: ['What is data', 'Types of data', 'Structured vs unstructured', 'Data lifecycle'] },
            { id: 'm2', title: 'What is a Database', topics: ['Definition', 'File system vs database', 'DBMS vs RDBMS', 'Examples', 'Use cases'] },
            { id: 'm3', title: 'Types of Databases', topics: ['Relational', 'NoSQL', 'Graph', 'Column', 'Document', 'Key-value'] },
            { id: 'm4', title: 'Database Architecture', topics: ['Client-server model', '2-tier', '3-tier', 'Database engine', 'Storage engine'] },
            { id: 'm5', title: 'Installing Databases', topics: ['MySQL', 'PostgreSQL', 'MongoDB', 'SQLite', 'pgAdmin', 'MongoDB Compass'] },
        ]
    },
    {
        level: 1,
        id: 'level-1',
        title: 'SQL Basics',
        subtitle: 'Foundation Level',
        description: 'Make user comfortable writing SQL queries.',
        icon: 'Terminal',
        modules: [
            { id: 'm6', title: 'SQL Introduction', topics: ['What is SQL', 'History', 'Standards', 'Dialects'] },
            { id: 'm7', title: 'Database Objects', topics: ['Database', 'Table', 'Row', 'Column', 'Schema'] },
            { id: 'm8', title: 'Data Types', topics: ['Numeric', 'String', 'Date & time', 'Boolean', 'Binary'] },
            { id: 'm9', title: 'Creating Tables', topics: ['CREATE DATABASE', 'CREATE TABLE', 'Column definition', 'Default values', 'Comments'] },
            { id: 'm10', title: 'CRUD Operations', topics: ['INSERT', 'SELECT', 'UPDATE', 'DELETE'] },
            { id: 'm11', title: 'SELECT Deep Dive', topics: ['Syntax', 'Column selection', 'DISTINCT', 'LIMIT', 'OFFSET'] },
            { id: 'm12', title: 'Filtering Data', topics: ['WHERE clause', 'Comparison operators', 'Logical operators', 'BETWEEN', 'IN', 'LIKE'] },
            { id: 'm13', title: 'Sorting', topics: ['ORDER BY', 'ASC vs DESC', 'Multi column sorting'] },
        ]
    },
    {
        level: 2,
        id: 'level-2',
        title: 'Intermediate SQL',
        subtitle: 'Manipulations & Relationships',
        description: 'Learn data manipulation & relationships.',
        icon: 'GitMerge',
        modules: [
            { id: 'm14', title: 'Aggregate Functions', topics: ['COUNT', 'SUM', 'AVG', 'MIN', 'MAX'] },
            { id: 'm15', title: 'GROUP BY', topics: ['Grouping data', 'Aggregations with grouping', 'HAVING clause'] },
            { id: 'm16', title: 'SQL Joins (Critical)', topics: ['INNER', 'LEFT', 'RIGHT', 'FULL', 'CROSS', 'SELF'] },
            { id: 'm17', title: 'Subqueries', topics: ['Scalar', 'Correlated', 'Nested', 'Subqueries in SELECT'] },
            { id: 'm18', title: 'Set Operations', topics: ['UNION', 'UNION ALL', 'INTERSECT', 'EXCEPT'] },
            { id: 'm19', title: 'CASE Statements', topics: ['Conditional logic', 'CASE WHEN', 'Nested CASE'] },
            { id: 'm20', title: 'Views', topics: ['What are views', 'Creating', 'Updating', 'Materialized'] },
        ]
    },
    {
        level: 3,
        id: 'level-3',
        title: 'Advanced SQL',
        subtitle: 'Professional Level',
        description: 'Make user industry ready.',
        icon: 'BarChart',
        modules: [
            { id: 'm21', title: 'Window Functions', topics: ['OVER clause', 'ROW_NUMBER', 'RANK', 'DENSE_RANK', 'NTILE', 'LEAD', 'LAG'] },
            { id: 'm22', title: 'CTEs', topics: ['WITH clause', 'Recursive CTE', 'Hierarchical queries'] },
            { id: 'm23', title: 'Advanced Aggregation', topics: ['GROUPING SETS', 'ROLLUP', 'CUBE'] },
            { id: 'm24', title: 'Pivoting Data', topics: ['Pivot tables', 'Unpivot'] },
            { id: 'm25', title: 'JSON in SQL', topics: ['JSON data types', 'JSON queries', 'JSON indexing'] },
        ]
    },
    {
        level: 4,
        id: 'level-4',
        title: 'Database Design',
        subtitle: 'Very Important',
        description: 'Teach how to design real databases.',
        icon: 'Layout',
        modules: [
            { id: 'm26', title: 'Data Modeling', topics: ['Conceptual model', 'Logical model', 'Physical model'] },
            { id: 'm27', title: 'ER Diagrams', topics: ['Entities', 'Relationships', 'Cardinality', 'Weak entities'] },
            { id: 'm28', title: 'Normalization', topics: ['1NF', '2NF', '3NF', 'BCNF', 'Denormalization'] },
            { id: 'm29', title: 'Keys', topics: ['Primary key', 'Foreign key', 'Candidate key', 'Composite key', 'Surrogate key'] },
            { id: 'm30', title: 'Constraints', topics: ['NOT NULL', 'UNIQUE', 'CHECK', 'DEFAULT', 'FOREIGN KEY'] },
        ]
    },
    {
        level: 5,
        id: 'level-5',
        title: 'Performance Optimization',
        subtitle: 'Senior Level',
        description: 'Teach how senior SQL developers optimize databases.',
        icon: 'Zap',
        modules: [
            { id: 'm31', title: 'Indexing', topics: ['What is index', 'B-tree index', 'Hash index', 'Composite index', 'Covering index'] },
            { id: 'm32', title: 'Query Optimization', topics: ['Query planner', 'Query cost', 'Execution plans', 'EXPLAIN'] },
            { id: 'm33', title: 'Transactions', topics: ['ACID properties', 'Transaction isolation levels', 'Dirty reads', 'Phantom reads'] },
            { id: 'm34', title: 'Locking', topics: ['Row locking', 'Table locking', 'Deadlocks', 'Optimistic vs pessimistic'] },
            { id: 'm35', title: 'Partitioning', topics: ['Horizontal partitioning', 'Vertical partitioning', 'Sharding'] },
        ]
    },
    {
        level: 6,
        id: 'level-6',
        title: 'PostgreSQL Deep Dive',
        subtitle: 'Advanced Engine',
        description: 'Internals and advanced features of PostgreSQL.',
        icon: 'Server',
        modules: [
            { id: 'm36', title: 'PostgreSQL Architecture', topics: ['Postgres internals', 'Write ahead log', 'Buffer manager'] },
            { id: 'm37', title: 'PostgreSQL Features', topics: ['Arrays', 'JSONB', 'Full text search'] },
            { id: 'm38', title: 'Stored Procedures', topics: ['Functions', 'Triggers', 'PL/pgSQL'] },
            { id: 'm39', title: 'Postgres Performance', topics: ['Index types', 'VACUUM', 'ANALYZE'] },
        ]
    },
    {
        level: 7,
        id: 'level-7',
        title: 'NoSQL Fundamentals',
        subtitle: 'Beyond Relational',
        description: 'When and why to use NoSQL.',
        icon: 'Layers',
        modules: [
            { id: 'm40', title: 'Why NoSQL Exists', topics: ['Scalability', 'Big data', 'CAP theorem'] },
            { id: 'm41', title: 'Types of NoSQL', topics: ['Document DB', 'Key-value DB', 'Column DB', 'Graph DB'] },
            { id: 'm42', title: 'SQL vs NoSQL', topics: ['Comparisons', 'Use Cases'] },
        ]
    },
    {
        level: 8,
        id: 'level-8',
        title: 'MongoDB Deep Dive',
        subtitle: 'Document DBs',
        description: 'Master the most popular NoSQL database.',
        icon: 'Leaf',
        modules: [
            { id: 'm43', title: 'MongoDB Basics', topics: ['Collections', 'Documents', 'BSON'] },
            { id: 'm44', title: 'CRUD Operations', topics: ['insertOne', 'insertMany', 'find', 'update', 'delete'] },
            { id: 'm45', title: 'Query Operators', topics: ['$eq', '$gt', '$lt', '$in', '$regex'] },
            { id: 'm46', title: 'Aggregation Pipeline', topics: ['$match', '$group', '$project', '$sort', '$lookup'] },
            { id: 'm47', title: 'Indexing in MongoDB', topics: ['Single field', 'Compound', 'Text'] },
            { id: 'm48', title: 'Replication', topics: ['Replica sets', 'Primary/Secondary'] },
            { id: 'm49', title: 'Sharding', topics: ['Shard keys', 'Clusters'] },
        ]
    },
    {
        level: 9,
        id: 'level-9',
        title: 'Real World Database Engineering',
        subtitle: 'Production Sys',
        description: 'Running db at scale.',
        icon: 'Shield',
        modules: [
            { id: 'm50', title: 'Database Security', topics: ['Authentication', 'Authorization', 'Encryption'] },
            { id: 'm51', title: 'Backup & Recovery', topics: ['Full backup', 'Incremental backup', 'Disaster recovery'] },
            { id: 'm52', title: 'Database Monitoring', topics: ['Metrics', 'Alerts'] },
            { id: 'm53', title: 'High Availability', topics: ['Failover', 'Redundancy'] },
        ]
    },
    {
        level: 10,
        id: 'level-10',
        title: 'SQL for Data Engineering',
        subtitle: 'Pipelines & Warehouses',
        description: 'Data analytics architectures.',
        icon: 'Briefcase',
        modules: [
            { id: 'm54', title: 'ETL Pipelines', topics: ['Extract', 'Transform', 'Load'] },
            { id: 'm55', title: 'Data Warehousing', topics: ['Concepts', 'Architecture'] },
            { id: 'm56', title: 'OLTP vs OLAP', topics: ['Differences', 'Use cases'] },
            { id: 'm57', title: 'Star Schema', topics: ['Fact tables', 'Dimension tables'] },
            { id: 'm58', title: 'Snowflake Schema', topics: ['Normalized dimensions'] },
        ]
    },
    {
        level: 11,
        id: 'level-11',
        title: 'SQL Interview Preparation',
        subtitle: 'Get Hired',
        description: 'Ace your technical interviews.',
        icon: 'Award',
        modules: [
            { id: 'm59', title: '300 SQL Interview Questions', topics: ['Beginner', 'Intermediate', 'Advanced'] },
            { id: 'm60', title: 'SQL Coding Challenges', topics: ['Easy (100)', 'Medium (200)', 'Hard (200)'] },
        ]
    },
    {
        level: 12,
        id: 'level-12',
        title: 'Real Projects',
        subtitle: 'Portfolio Building',
        description: 'Build end-to-end practical projects.',
        icon: 'Briefcase',
        modules: [
            { id: 'p1', title: 'E-commerce database', topics: ['Schema', 'Queries', 'Optimization'] },
            { id: 'p2', title: 'Banking system', topics: ['Transactions', 'Consistency', 'Audit logs'] },
            { id: 'p3', title: 'Social media database', topics: ['Graphs', 'Feeds', 'Likes'] },
            { id: 'p4', title: 'Netflix recommendation data', topics: ['Views', 'Ratings', 'Analytics'] },
            { id: 'p5', title: 'Trading database', topics: ['High-frequency', 'Time-series', 'Ledger'] },
        ]
    }
];

export const getIconComponent = (iconName) => {
    return iconName; // In a real app, map this string to the Lucide icon component.
};

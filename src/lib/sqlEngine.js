import initSqlJs from 'sql.js';
import sqlWasmUrl from 'sql.js/dist/sql-wasm.wasm?url';
import { datasets } from '../data/datasets';

class SQLEngine {
    constructor() {
        this.db = null;
        this.initPromise = null;
    }

    async init() {
        if (this.initPromise) return this.initPromise;

        this.initPromise = (async () => {
            try {
                const SQL = await initSqlJs({
                    // Fetch WASM using Vite URL import to bypass public folder caching issues
                    locateFile: file => sqlWasmUrl
                });
                this.db = new SQL.Database();
                return true;
            } catch (err) {
                console.error("Failed to initialize sql.js:", err);
                throw err;
            }
        })();

        return this.initPromise;
    }

    loadDataset(name) {
        if (!this.db) throw new Error("Database not initialized");

        // Keep track of loaded datasets to prevent duplicate execution errors
        if (!this.loadedDatasets) this.loadedDatasets = new Set();
        if (this.loadedDatasets.has(name)) return true;

        const sqlString = datasets[name];
        if (!sqlString) throw new Error(`Dataset ${name} not found`);

        try {
            this.db.run(sqlString);
            this.loadedDatasets.add(name);
            return true;
        } catch (err) {
            // If it fails because table exists, we still mark it as loaded
            if (err.message.includes("already exists")) {
                this.loadedDatasets.add(name);
                return true;
            }
            console.error(`Failed to load dataset ${name}:`, err);
            throw err;
        }
    }

    execute(query) {
        if (!this.db) throw new Error("Database not initialized");

        try {
            const results = this.db.exec(query);
            if (results.length === 0) return { columns: [], values: [] };
            return results[0]; // returns { columns: ['a', 'b'], values: [[1, 2], [3, 4]] }
        } catch (err) {
            throw new Error(err.message);
        }
    }

    getTables() {
        if (!this.db) return [];

        try {
            const query = "SELECT name FROM sqlite_master WHERE type='table';";
            const results = this.db.exec(query);
            if (results.length === 0) return [];

            return results[0].values.map(row => row[0]);
        } catch (err) {
            console.error("Failed to get tables:", err);
            return [];
        }
    }

    getSchema(tableName) {
        if (!this.db) return [];

        try {
            const query = `PRAGMA table_info(${tableName});`;
            const results = this.db.exec(query);
            if (results.length === 0) return [];

            // format: [{ cid: 0, name: 'id', type: 'INTEGER', notnull: 0, dflt_value: null, pk: 1 }]
            return results[0].values.map(row => ({
                cid: row[0],
                name: row[1],
                type: row[2],
                notnull: row[3],
                dflt_value: row[4],
                pk: row[5]
            }));
        } catch (err) {
            console.error(`Failed to get schema for ${tableName}:`, err);
            return [];
        }
    }
}

export const sqlEngine = new SQLEngine();

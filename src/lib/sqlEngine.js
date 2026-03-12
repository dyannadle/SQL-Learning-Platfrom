const BACKEND_URL = "http://127.0.0.1:8000";

class SQLEngine {
    constructor() {
        this.currentDataset = "empty";
        this.sessionId = null;
        this.initPromise = null;
    }

    async init() {
        if (this.initPromise) return this.initPromise;

        this.initPromise = (async () => {
            try {
                const res = await fetch(`${BACKEND_URL}/health`);
                if (!res.ok) throw new Error("Backend not healthy");
                return true;
            } catch (err) {
                console.error("Failed to connect to backend:", err);
                return false;
            }
        })();

        return this.initPromise;
    }

    async resetSession() {
        if (this.sessionId) {
            try {
                await fetch(`${BACKEND_URL}/cleanup/${this.sessionId}`, { method: 'POST' });
            } catch (e) {
                console.warn("Cleanup failed", e);
            }
        }
        this.sessionId = null;
        return true;
    }

    loadDataset(name) {
        if (this.currentDataset !== name) {
            this.currentDataset = name || "empty";
            // If dataset changes, we should probably reset session to get fresh seed
            this.resetSession();
        }
        return true;
    }

    async execute(query, includePlan = false) {
        try {
            const response = await fetch(`${BACKEND_URL}/execute`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    query,
                    dataset: this.currentDataset,
                    include_plan: includePlan,
                    session_id: this.sessionId
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || "Database Error");
            }

            if (data.error) {
                throw new Error(data.error);
            }

            // Capture session ID from first execution
            if (!this.sessionId && data.session_id) {
                this.sessionId = data.session_id;
            }

            return {
                columns: data.columns,
                values: data.rows,
                affected_rows: data.affected_rows,
                execution_time_ms: data.execution_time_ms,
                queryPlan: data.query_plan
            };
        } catch (err) {
            throw new Error(err.message);
        }
    }

    async getTables() {
        try {
            const res = await this.execute("SELECT name FROM sqlite_master WHERE type='table';");
            return res.values.map(row => row[0]);
        } catch (err) {
            console.error("Failed to get tables:", err);
            return [];
        }
    }

    async getSchema(tableName) {
        try {
            const res = await this.execute(`PRAGMA table_info(${tableName});`);
            return res.values.map(row => ({
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



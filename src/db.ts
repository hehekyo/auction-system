import { Pool } from 'pg';

// 从环境变量中加载数据库配置
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// 执行查询的通用函数
export const query = async (text: string, params?: any[]) => {
    const start = Date.now();
    try {
        const res = await pool.query(text, params);
        const duration = Date.now() - start;
        console.log('Executed query', { text, duration, rows: res.rowCount });
        return res;
    } catch (err) {
        console.error('Database query error', err.stack);
        throw err;
    }
};

// 关闭数据库连接池（在程序退出或测试结束时调用）
export const closePool = async () => {
    await pool.end();
    console.log('Database connection pool has been closed');
};

export default pool;

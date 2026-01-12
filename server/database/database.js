import pkg from 'pg';
const { Client } = pkg;


const client = new Client({
    host: 'localhost',
    user: 'postgres',
    password: 'Amrut2004.',
    database: 'postgres',
    port: 5432,
});

export const connectDB = async () => {
    try {
        await client.connect();
        console.log('✅ Database connected successfully');

    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
        process.exit(1);
    }
};

export default client;

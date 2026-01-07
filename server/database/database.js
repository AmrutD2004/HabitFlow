import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
    host: 'ep-shy-mud-a14311sx-pooler.ap-southeast-1.aws.neon.tech',
    user: 'neondb_owner',
    password: 'npg_bUCMwkje4W0Y',
    database: 'neondb',
    port: 5432,
    ssl: {
        require: true
    }
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

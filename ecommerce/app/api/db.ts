
import { MongoClient, Db, ServerApiVersion } from 'mongodb';

// Cached client and cashed db to prevent multiple connections in development
let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;
export async function connectToDatabase() {

if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const uri = "mongodb+srv://ashek28_db_user:kIHvIVMPGhZ8lwM1@cluster0.zgflucb.mongodb.net/?appName=Cluster0";
  console.log("URI Check:", uri);
  console.log("Connecting to MongoDB...");
  
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  await client.connect();
    cachedClient = client;
    cachedDb = client.db('ecommerce-nextjs');

    
  return {client, db: client.db('ecommerce-nextjs')};
}

console.log("Connecting with user:", process.env.MONGODB_USER);
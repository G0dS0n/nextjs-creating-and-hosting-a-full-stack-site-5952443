
import { connectToDatabase } from "../db";

export async function GET() {
  try {
    // query to the database to get products
    const { db } = await connectToDatabase();
    const products = await db.collection('products').find({}).toArray();

    return new Response(
      JSON.stringify(products),
      { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }, 
    }
  );
  } catch (error) {
    console.error('Error fetching products:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch products' }),
      { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }, 
    }
  );
  }
}
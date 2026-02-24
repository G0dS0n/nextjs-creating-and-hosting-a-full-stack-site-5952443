import { NextRequest } from 'next/server';
import { connectToDatabase } from '@/app/api/db';
import { UpdateFilter } from 'mongodb';

// type ShoppingCart = Record<string, string[]>;
 
// const carts: ShoppingCart = {
//   '1': ['123', '234'],
//   '2': ['234', '345'],
//   '3': ['123', '345'],
// }
type Params = {
  id: string;
};
  export async function GET( request: NextRequest,{ params }: { params: Params }) {
    try {
      const { db } = await connectToDatabase();
      const userId = params.id;
      const userCart = await db.collection('carts').findOne({ userId });

      if (!userCart) {
        return new Response(
          JSON.stringify([]),
          { 
          headers: { 'Content-Type': 'application/json' }, 
          status: 200 
        });
      }
    
      const cartIds = userCart.cartId;
      const cartProducts = await db.collection('products').find({ id: { $in: cartIds } }).toArray();

      return new Response(
        JSON.stringify(cartProducts),
        { 
        headers: { 'Content-Type': 'application/json' }, 
        status: 200 
      }
    );
    } catch (error) {
      console.error('Error fetching cart:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch cart' }),
        { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }, 
      }
    );
    }
  }

type cartBody = {
  productId: string;
}

  export async function POST( request: NextRequest,{ params }: { params: Params }) {
    try {
      const { db } = await connectToDatabase();
      const userId = params.id;
      const body: cartBody = await request.json();
      const productId = body.productId;
      
      const updatedCart = await db.collection('carts').findOneAndUpdate(
        { userId },
        { $push: { cartId: productId } } as unknown as UpdateFilter<any>,
        { upsert: true, returnDocument: 'after' }
      );

      if (!updatedCart) {
        return new Response(
          JSON.stringify([]),
          { 
          headers: { 'Content-Type': 'application/json' }, 
          status: 500 
        });
      }
    
    const cartProducts = await db.collection('products').find({ id: { $in: updatedCart.cartId } }).toArray();

      return new Response(
        JSON.stringify(cartProducts),
        { 
        headers: { 'Content-Type': 'application/json' }, 
        status: 201 
      }
    );
    } catch (error) {
      console.error('Error adding to cart:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to add to cart' }),
        { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }, 
      }
    );
    }
  }

export async function DELETE( request: NextRequest,{ params }: { params: Params }) {
  try {
    const { db } = await connectToDatabase();
    const userId = params.id;
    const body: cartBody = await request.json();
    const productId = body.productId;

    const updatedCart = await db.collection('carts').findOneAndUpdate(
      { userId },
      { $pull: { cartId: productId } } as unknown as UpdateFilter<any>,
      { returnDocument: 'after' }
    );
  if (!updatedCart) {
      return new Response(
        JSON.stringify([]),
        { 
        headers: { 'Content-Type': 'application/json' }, 
        status: 202
      }, 
      );
    }
    const cartProducts = await db.collection('products').find({ id: { $in: updatedCart.cartId } }).toArray();

    return new Response(
      JSON.stringify(cartProducts),
      { 
      headers: { 'Content-Type': 'application/json' }, 
      status: 202 
    }
  );
  } catch (error) {
    console.error('Error removing from cart:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to remove from cart' }),
      { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }, 
    }
  );
  }
} 
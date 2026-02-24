'use client';
import Link from 'next/link';
import { useEffect } from 'react';
import { Product } from '../product-data';
import { useCart } from '../CartContext';

export default function ShoppingCartList({initialCartProducts}: {initialCartProducts: Product[]}) {
  const { cartItems, removeFromCart, updateQuantity, initializeCart } = useCart();

  useEffect(() => {
    if (initialCartProducts && initialCartProducts.length > 0) {
      initializeCart(initialCartProducts);
    }
  }, [initialCartProducts, initializeCart]);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 py-12'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-12'>
          <h1 className='text-5xl md:text-6xl font-bold text-slate-900 mb-4'>Shopping Cart</h1>
          <p className='text-xl text-slate-600'>
            { cartItems.length === 0 ? 'Your cart is empty' : `${cartItems.reduce((sum, item) => sum + item.quantity, 0)} item${cartItems.reduce((sum, item) => sum + item.quantity, 0) !== 1 ? 's' : ''} in your cart`}
          </p>
        </div>

        {cartItems.length === 0 ? (
          // Empty Cart State
          <div className='text-center py-16'>
            <div className='mb-6 flex justify-center'>
              <div className='p-6 bg-slate-100 rounded-full'>
                <svg className='w-16 h-16 text-slate-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z' />
                </svg>
              </div>
            </div>
            <h2 className='text-2xl font-semibold text-slate-900 mb-3'>Your cart is empty</h2>
            <p className='text-slate-600 mb-8'>Start shopping to add items to your cart</p>
            <Link
              href='/products'
              className='inline-block bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 ease-out transform hover:scale-105 shadow-md hover:shadow-lg'
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          // Cart Items
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* Cart Items List */}
            <div className='lg:col-span-2 space-y-4'>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className='bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition duration-300 ease-out'
                >
                  <div className='flex items-start justify-between gap-4'>
                    <div className='flex-1'>
                      <h3 className='text-lg font-semibold text-slate-900 mb-2'>{item.name}</h3>
                      <p className='text-slate-600 text-sm mb-4'>{item.description}</p>
                      <div className='flex items-end justify-between'>
                        <span className='text-2xl font-bold text-slate-900'>${item.price.toFixed(2)} <span className='text-sm font-medium text-slate-500'>AUD</span></span>
                        
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className='flex-shrink-0 p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition duration-200'
                      title='Remove from cart'
                    >
                      <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
                      </svg>
                    </button>
                  </div>

                  {/* Quantity Controls */}
                  <div className='mt-4 flex items-center gap-4'>
                    <span className='text-sm font-medium text-slate-600'>Quantity:</span>
                    <div className='flex items-center border border-slate-300 rounded-lg bg-white'>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className='px-3 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition duration-200 font-semibold'
                        title='Decrease quantity'
                      >
                        −
                      </button>
                      <span className='px-4 py-2 font-semibold text-slate-900 bg-slate-50 min-w-[3rem] text-center'>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className='px-3 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition duration-200 font-semibold'
                        title='Increase quantity'
                      >
                        +
                      </button>
                    </div>
                    <span className='text-sm font-semibold text-slate-900 ml-auto'>
                      Subtotal: ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className='lg:col-span-1'>
              <div className='bg-white rounded-xl border border-slate-200 p-8 sticky top-24 shadow-sm'>
                <h2 className='text-2xl font-bold text-slate-900 mb-6'>Order Summary</h2>

                <div className='space-y-4 mb-6 pb-6 border-b border-slate-200'>
                  <div className='flex justify-between items-center'>
                    <span className='text-slate-600'>Subtotal</span>
                    <span className='font-semibold text-slate-900'>${total.toFixed(2)}</span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-slate-600'>Shipping</span>
                    <span className='font-semibold text-slate-900'>Free</span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-slate-600'>Tax</span>
                    <span className='font-semibold text-slate-900'>${(total * 0.1).toFixed(2)}</span>
                  </div>
                </div>

                <div className='flex justify-between items-center mb-6 text-xl font-bold'>
                  <span className='text-slate-900'>Total</span>
                  <span className='text-2xl text-blue-600'>${(total * 1.1).toFixed(2)} <span className='text-sm font-medium text-slate-500'>AUD</span></span>
                  
                </div>

                <button className='w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-lg transition duration-300 ease-out transform hover:scale-105 shadow-md hover:shadow-lg mb-3 flex items-center justify-center gap-2'>
                  <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                  </svg>
                  <Link href='/checkout'>Proceed to Checkout
                  </Link>
                </button>

                <Link
                  href='/products'
                  className='w-full border-2 border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 font-semibold py-4 px-6 rounded-lg transition duration-300 ease-out text-center block'
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
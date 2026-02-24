'use client';

import Link from 'next/link';
import { useCart } from './CartContext';

export default function Navigation() {
  const { cartItems } = useCart();

  return (
    <nav className='sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo/Brand */}
          <Link href='/products' className='flex items-center gap-2 group'>
            <div className='w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center group-hover:shadow-lg transition duration-300'>
              <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z' />
              </svg>
            </div>
            <span className='font-bold text-xl text-slate-900 hidden sm:inline'>Store</span>
          </Link>

          {/* Shopping Cart Link */}
          <Link
            href='/cart'
            className='flex items-center gap-3 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold transition duration-300 ease-out transform hover:scale-105 shadow-md hover:shadow-lg group'
          >
            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z' />
            </svg>
            <span className='hidden sm:inline'>My Shopping Cart</span>
            <span className='sm:hidden'>Cart</span>
            {cartItems.length > 0 && (
              <span className='ml-1 inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-bold leading-none text-white bg-red-500 group-hover:bg-red-600 transition duration-300'>
                {cartItems.reduce((total: number, item) => total + item.quantity, 0)}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}

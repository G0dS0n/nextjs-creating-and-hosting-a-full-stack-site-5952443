'use client';

import { useCart } from './CartContext';
import { Product } from './product-data';
import { useState, useEffect } from 'react';

export default function AddToCartButton({ product, keepAddedState = false }: { product: Product; keepAddedState?: boolean }) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(keepAddedState);

  // Update isAdded state when keepAddedState prop changes
  useEffect(() => {
    setIsAdded(keepAddedState);
  }, [keepAddedState]);

  const handleClick = () => {
    addToCart(product);
    setIsAdded(true);
    
    // Reset button after 2 seconds (unless keepAddedState is true)
    if (!keepAddedState) {
      setTimeout(() => {
        setIsAdded(false);
      }, 2000);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isAdded && keepAddedState}
      className={`w-full font-semibold py-3 px-6 rounded-lg transition duration-300 ease-out flex items-center justify-center gap-2 ${
        isAdded
          ? 'bg-green-500 hover:bg-green-600 text-white'
          : 'bg-blue-600 hover:bg-blue-700 text-white'
      } disabled:opacity-100`}
    >
      {isAdded ? (
        <>
          <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
            <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
          </svg>
          Added to Cart
        </>
      ) : (
        <>
          <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z' />
          </svg>
          Add to Cart
        </>
      )}
    </button>
  );
}

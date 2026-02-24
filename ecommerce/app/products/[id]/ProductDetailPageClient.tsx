'use client';

import Image from 'next/image';
import AddToCartButton from '@/app/AddToCartButton';
import { Product } from '@/app/product-data';
import { useCart } from '@/app/CartContext';
import { useMemo } from 'react';
import Link from 'next/link';

export default function ProductDetailPageClient({ product }: { product: Product }) {
  const { cartItems } = useCart();
  
  const isInCart = useMemo(() => {
    return cartItems.some((item) => item.id === product.id);
  }, [cartItems, product.id]);

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        {/* Breadcrumb / Header */}
        <div className='mb-12'>
          <h1 className='text-sm font-semibold text-slate-500 uppercase tracking-widest mb-8'>Product Details</h1>
        </div>

        {/* Main Product Section */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-start'>
          {/* Image Section */}
          <div className='flex items-center justify-center bg-white rounded-2xl shadow-sm border border-slate-100 p-8 lg:p-12 sticky top-24'>
            <div className='relative aspect-square w-full max-w-md'>
              <Image
                src={'/' + product.imageUrl}
                alt={product.name}
                width={500}
                height={500}
                className='object-contain w-full h-full'
              />
            </div>
          </div>

          {/* Product Info Section */}
          <div className='flex flex-col justify-start space-y-8'>
            {/* Title and Price */}
            <div>
              <h2 className='text-5xl font-bold text-slate-900 mb-4 leading-tight'>{product.name}</h2>
              <div className='flex items-baseline gap-3'>
                <span className='text-4xl font-bold text-slate-900'>${product.price}</span>
                <span className='text-sm font-medium text-slate-500'>AUD</span>
              </div>
            </div>

            {/* Divider */}
            <div className='w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full'></div>

            {/* Description */}
            <div className='space-y-4'>
              <h3 className='text-sm font-semibold text-slate-600 uppercase tracking-wide'>About This Product</h3>
              <p className='text-lg text-slate-700 leading-relaxed'>{product.description}</p>
            </div>

            {/* CTA Button */}
            <div className='space-y-4 pt-4'>
              <AddToCartButton product={product} keepAddedState={isInCart} />
              <Link href="/products">
              <button className='mt-4 w-full border-2 border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 font-semibold py-4 px-6 rounded-lg transition duration-300 ease-out'>
                View Similar Products
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

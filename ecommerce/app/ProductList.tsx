'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from './product-data';
import AddToCartButton from './AddToCartButton';

export default function ProductList({ products, initialCartProducts }: { products: Product[], initialCartProducts?: Product[] }) {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
        {products.map(product => (
          <div key={product.id} className='group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-slate-100 overflow-hidden transition duration-300 ease-out transform hover:-translate-y-1'>
            {/* Image Container */}
            <Link href={"/products/" + product.id}>
              <div className='relative aspect-square bg-slate-100 overflow-hidden'>
                <Image 
                  src={'/' + product.imageUrl} 
                  alt={product.name} 
                  width={250} 
                  height={250}
                  className='w-full h-full object-cover group-hover:scale-110 transition duration-300 ease-out'
                />
              </div>
            </Link>

            {/* Content Container */}
            <div className='p-6 flex flex-col'>
              <Link href={"/products/" + product.id}>
                <h2 className='text-lg font-semibold text-slate-900 mb-2 line-clamp-2 hover:text-blue-600 transition duration-200'>
                  {product.name}
                </h2>
              </Link>
              
              <p className='text-2xl font-bold text-slate-900 mb-4'>${product.price}</p>
              
              <div className='mt-auto'>
                <AddToCartButton product={product} />
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}
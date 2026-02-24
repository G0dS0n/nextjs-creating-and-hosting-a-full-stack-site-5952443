import ProductList from "../ProductList"
 export const dynamic = 'force-dynamic';
 
export default async function ProductPage(){
  let products = [];
  let cartProducts = [];

  try {
    const response = await fetch(process.env.NEXT_PUBLIC_SITE_URL +'/api/products');
    if (response.ok) {
      products = await response.json();
    } else {
      console.error('Failed to fetch products:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('Error fetching products:', error);
  }

  try {
    const response2 = await fetch(process.env.NEXT_PUBLIC_SITE_URL +'/api/users/2/cart');
    if (response2.ok) {
      cartProducts = await response2.json();
    } else {
      console.error('Failed to fetch cart:', response2.status, response2.statusText);
    }
  } catch (error) {
    console.error('Error fetching cart:', error);
  }
  

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        {/* Header Section */}
        <div className='mb-16'>
          <h1 className='text-5xl md:text-6xl font-bold text-slate-900 mb-4'>Our Products</h1>
          <p className='text-xl text-slate-600 max-w-2xl'>Explore our curated collection of premium products</p>
        </div>
        
        {/* Products Grid */}
        <ProductList products={products} initialCartProducts={cartProducts} />
      </div>
    </div>
  )
}

import NotFoundPage from '@/app/not-found';
import ProductDetailPageClient from './ProductDetailPageClient';

interface ProductDetailPageProps {
  params: { id: number|string; };
}

 export const dynamic = 'force-dynamic';

export default async function ProductDetailPage(props: ProductDetailPageProps) {
const response = await fetch(process.env.NEXT_PUBLIC_SITE_URL +'/api/products' + '/' + props.params.id);  
const product = await response.json();

  if (!product) {
    return <NotFoundPage />;
  }

  return <ProductDetailPageClient product={product} />;
}
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProductByBarcode } from '../lib/api/foodApi';
import Layout, { PageHeader, PageContent } from '../components/ui/layout';
import ProductDetailView from '../components/product/product-detail-view';

/**
 * ProductDetailPage component - Redesigned product detail page
 * 
 * @returns {JSX.Element} - ProductDetailPage component
 */
const ProductDetailPage = () => {
  const { id } = useParams();
  
  // Fetch product details using React Query
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductByBarcode(id),
  });

  // Extract product data
  const product = data?.product || {};
  
  // Handle error state
  if (isError) {
    return (
      <Layout>
        <PageHeader title="Product Not Found" />
        <div className="max-w-3xl mx-auto">
          <div className="rounded-lg border bg-card p-6 text-center">
            <h3 className="text-lg font-medium mb-2">Error loading product</h3>
            <p className="text-muted-foreground mb-4">
              {error?.message || 'Failed to load product information. Please try again.'}
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHeader 
        title={isLoading ? 'Loading Product...' : (product.product_name || 'Product Details')}
      />
      <div className="max-w-5xl mx-auto">
        <ProductDetailView product={product} isLoading={isLoading} />
      </div>
    </Layout>
  );
};

export default ProductDetailPage;
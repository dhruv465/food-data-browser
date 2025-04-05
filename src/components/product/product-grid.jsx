import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { useTheme } from '../../lib/theme-context';
import { applyGlass } from '../../lib/glassmorphism';
import ProductCardNew from './product-card';

/**
 * ProductGrid component - Displays products in a responsive grid layout
 * 
 * @param {Object} props - Component props
 * @param {Array} props.products - Array of product objects to display
 * @param {boolean} props.loading - Whether products are loading
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} - ProductGrid component
 */
const ProductGrid = ({ 
  products = [], 
  loading = false,
  className,
  ...props 
}) => {
  const { theme } = useTheme();
  
  // If loading, show skeleton grid
  if (loading) {
    return (
      <div className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
        className
      )} {...props}>
        {Array(8).fill(0).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }
  
  // If no products, show empty state
  if (products.length === 0) {
    return (
      <div className={cn(
        "flex flex-col items-center justify-center p-8 text-center",
        applyGlass('card', theme),
        "rounded-lg",
        className
      )} {...props}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-muted-foreground mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h7" />
        </svg>
        <h3 className="text-lg font-medium mb-2">No products found</h3>
        <p className="text-muted-foreground max-w-md">Try adjusting your search or filter criteria to find what you're looking for.</p>
      </div>
    );
  }
  
  // Render product grid
  return (
    <div className={cn(
      "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
      className
    )} {...props}>
      {products.map((product) => (
        <ProductCardNew key={product.id} product={product} />
      ))}
    </div>
  );
};

/**
 * ProductCard component - Displays a single product in the grid
 * 
 * @param {Object} props - Component props
 * @param {Object} props.product - Product data to display
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} - ProductCard component
 */
export const ProductCard = ({ 
  product, 
  className,
  ...props 
}) => {
  const { theme } = useTheme();
  
  return (
    <Link 
      to={`/product/${product.id}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-lg transition-all duration-300",
        "hover:shadow-md hover:-translate-y-1",
        applyGlass('card', theme),
        className
      )}
      {...props}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        
        {/* Nutrition score badge */}
        {product.nutritionScore && (
          <div className="absolute top-2 right-2 flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-zinc-800 shadow-md">
            <span className={cn(
              "text-sm font-bold",
              product.nutritionScore <= 3 ? "text-green-600 dark:text-green-400" :
              product.nutritionScore <= 6 ? "text-yellow-600 dark:text-yellow-400" :
              "text-red-600 dark:text-red-400"
            )}>
              {product.nutritionScore}
            </span>
          </div>
        )}
      </div>
      
      {/* Product Info */}
      <div className="flex flex-col p-4">
        <h3 className="font-medium text-lg mb-1 line-clamp-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
          {product.name}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {product.brand || 'Unknown brand'}
        </p>
        
        {/* Product Highlights */}
        <div className="mt-auto flex flex-wrap gap-2">
          {product.labels_tags && product.labels_tags.some(label => label.toLowerCase().includes('organic')) && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
              Organic
            </span>
          )}
          
          {product.labels_tags && product.labels_tags.some(label => label.toLowerCase().includes('vegetarian')) && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
              Vegetarian
            </span>
          )}
          
          {product.labels_tags && product.labels_tags.some(label => label.toLowerCase().includes('vegan')) && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400">
              Vegan
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

/**
 * ProductCardSkeleton component - Loading placeholder for product cards
 * 
 * @param {Object} props - Component props
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} - ProductCardSkeleton component
 */
export const ProductCardSkeleton = ({ 
  className,
  ...props 
}) => {
  const { theme } = useTheme();
  
  return (
    <div 
      className={cn(
        "flex flex-col overflow-hidden rounded-lg",
        applyGlass('card', theme),
        className
      )}
      {...props}
    >
      {/* Image skeleton */}
      <div className="aspect-square bg-gray-200 dark:bg-gray-800 animate-pulse" />
      
      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse w-2/3" />
        <div className="h-8 mt-2" /> {/* Spacer */}
        <div className="flex gap-2">
          <div className="h-6 w-16 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse" />
          <div className="h-6 w-20 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
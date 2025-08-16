'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Star } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import { Product } from '@/types'

interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
    >
      {/* Product Image */}
      <div className="relative aspect-video bg-muted overflow-hidden">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
            <div className="text-4xl font-bold text-muted-foreground">
              {product.name.charAt(0)}
            </div>
          </div>
        )}
        
        {/* Featured Badge */}
        {product.featured && (
          <div className="absolute top-3 left-3">
            <div className="flex items-center space-x-1 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
              <Star className="w-3 h-3 fill-current" />
              <span>Featured</span>
            </div>
          </div>
        )}

        {/* Category Badge */}
        {product.category && (
          <div className="absolute top-3 right-3">
            <div className="bg-background/80 backdrop-blur-sm text-foreground px-2 py-1 rounded-full text-xs font-medium">
              {product.category}
            </div>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6">
        <div className="space-y-3">
          {/* Product Name */}
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
            {product.name}
          </h3>

          {/* Product Description */}
          <p className="text-muted-foreground text-sm line-clamp-2">
            {product.description}
          </p>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-primary">
              {formatPrice(product.price)}
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-2 pt-2">
            <Link
              href={`/products/${product.id}`}
              className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors duration-200 font-medium text-sm"
            >
              Lihat Detail
            </Link>
            
            <button
              onClick={() => onAddToCart?.(product)}
              className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200 font-medium text-sm"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Beli
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}


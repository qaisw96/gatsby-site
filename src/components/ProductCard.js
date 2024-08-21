import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import ProductActions from "./ProductActions"

const ProductCard = ({
  product,
  isInCart,
  quantity,
  onAddToCart,
  onRemove,
  onQuantityChange,
  hoveredProduct,
  setHoveredProduct,
}) => {
  return (
    <div
      className="bg-white rounded-md"
      onMouseEnter={() => setHoveredProduct(product.id)}
      onMouseLeave={() => setHoveredProduct(null)}
    >
      {product.images && (
        <Link to={`/products/${product.id}`}>
          <GatsbyImage
            image={getImage(product.images[0])}
            alt={product.title}
            className="w-full"
            style={{ maxHeight: 300 }}
          />
        </Link>
      )}
      <div className="p-4">
        <h2 className="">{product.title}</h2>
        <p className="text-sm text-primary mt-2 font-bold">
          {product.price} دينار
        </p>
        <ProductActions
          isInCart={isInCart}
          quantity={quantity}
          onAddToCart={onAddToCart}
          onRemove={onRemove}
          onQuantityChange={onQuantityChange}
          productId={product.id}
          hoveredProduct={hoveredProduct}
          product={product}
        />
      </div>
    </div>
  )
}

export default ProductCard

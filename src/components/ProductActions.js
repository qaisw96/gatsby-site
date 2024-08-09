import React from "react"
import { motion } from "framer-motion"

const ProductActions = ({
  isInCart,
  quantity,
  onAddToCart,
  onRemove,
  onQuantityChange,
  productId,
  hoveredProduct,
  product,
}) => {
  return (
    <div className="text-center relative">
      <button
        className={`text-sm rounded-sm mt-2 py-3 w-full ${
          isInCart ? "bg-primary text-white" : "bg-third"
        }`}
        onClick={() => (isInCart ? onRemove(productId) : onAddToCart(product))}
      >
        <span>{isInCart ? "تمت اضافته" : "أضف للمشتريات"}</span>
        {quantity > 0 && <span className="mr-2 underline">{quantity}</span>}
      </button>

      {isInCart && (
        <motion.div
          className={`absolute top-0 left-0 right-0 h-full flex justify-between items-center px-2 ${
            hoveredProduct === productId || window.innerWidth < 768
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          } transition-opacity duration-300`}
        >
          <motion.button
            className="text-white bg-secondary px-2 rounded-sm h-fit mt-2"
            initial={{ x: window.innerWidth < 768 ? 0 : "100%" }}
            animate={{ x: 0 }}
            onClick={() => onQuantityChange(productId, 1)}
          >
            +
          </motion.button>
          <motion.button
            className="text-white bg-secondary px-2 rounded-sm h-fit mt-2"
            initial={{ x: window.innerWidth < 768 ? 0 : "-100%" }}
            animate={{ x: 0 }}
            onClick={() => onQuantityChange(productId, -1)}
          >
            -
          </motion.button>
        </motion.div>
      )}
    </div>
  )
}

export default ProductActions

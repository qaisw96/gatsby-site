import React from "react"
import { motion } from "framer-motion"
import clsx from "clsx"

const ProductActions = ({
  isInCart,
  quantity,
  onAddToCart,
  onRemove,
  onQuantityChange,
  productId,
  hoveredProduct,
  product,
  isProductPage = false,
}) => {
  return (
    <div
      className={clsx("text-center relative", {
        "lg:w-[300px] md:mt-10": isProductPage,
      })}
    >
      <button
        className={clsx("text-sm rounded-sm mt-2 py-3 w-full", {
          "bg-primary text-white": isInCart,
          "bg-slate-200": !isInCart,
        })}
        onClick={() => (isInCart ? onRemove(productId) : onAddToCart(product))}
      >
        <span>{isInCart ? "تمت اضافته" : "أضف للمشتريات"}</span>
        {quantity > 0 && <span className="mr-2 underline">{quantity}</span>}
      </button>

      {isInCart && (
        <motion.div
          className={clsx(
            "absolute top-0 left-0 right-0 h-full flex justify-between items-center px-2 transition-opacity duration-300",
            {
              "opacity-100 pointer-events-auto":
                hoveredProduct === productId || window.innerWidth < 768,
              "opacity-0 pointer-events-none": !(
                hoveredProduct === productId || window.innerWidth < 768
              ),
            }
          )}
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

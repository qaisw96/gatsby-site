import React, { useState, useEffect } from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import { motion } from "framer-motion"
import {
  addToCart,
  getCart,
  getProductFromCart,
  isProductInCart,
  removeFromCart,
  updateCartQuantity,
} from "../utils/cart"
import Alert from "./Alert"
import clsx from "clsx"

const Products = ({ products }) => {
  const [alertMessage, setAlertMessage] = useState("")
  const [cartItems, setCartItems] = useState([])
  const [hoveredProduct, setHoveredProduct] = useState(null)

  useEffect(() => {
    setCartItems(getCart())
  }, [])

  const handleAddToCart = product => {
    addToCart(product)
    setCartItems(getCart())
    setAlertMessage("تم إضافة المنتج إلى السلة!")
  }

  const handleRemove = productId => {
    removeFromCart(productId)
    const newCart = cartItems.filter(item => item.id !== productId)
    setCartItems(newCart)
    setAlertMessage("تم إزالة المنتج من السلة!")
  }

  const handleQuantityChange = (productId, change) => {
    updateCartQuantity(productId, change)
    setCartItems(getCart())
  }

  const handleAlertClose = () => {
    setAlertMessage("")
  }

  return (
    <div>
      {alertMessage && (
        <Alert message={alertMessage} onClose={handleAlertClose} />
      )}
      <div className="container grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 py-20">
        {[...products].map(({ node }) => {
          const isInCart = isProductInCart(node.id)
          const quantity = getProductFromCart(node.id)?.quantity || 0

          return (
            <motion.div
              key={node.id}
              className="bg-white rounded-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              onMouseEnter={() => setHoveredProduct(node.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {node.images && (
                <Link to={`/products/${node.id}`}>
                  <GatsbyImage
                    image={getImage(node.images[0])}
                    alt={node.title}
                    className="w-full"
                  />
                </Link>
              )}
              <div className="p-4">
                <h2 className="">{node.title}</h2>
                <p className="text-sm text-primary mt-2 font-bold">
                  {node.price} دينار
                </p>
                <div className="text-center relative">
                  <button
                    className={clsx("text-sm rounded-sm mt-2 py-3 w-full", {
                      "bg-primary text-white": isInCart,
                      "bg-third": !isInCart,
                    })}
                    onClick={() =>
                      isInCart ? handleRemove(node.id) : handleAddToCart(node)
                    }
                  >
                    <span>{isInCart ? "تمت اضافته" : "أضف للمشتريات"}</span>

                    {quantity > 0 && (
                      <span className="mr-2 underline">{quantity}</span>
                    )}
                  </button>

                  {isInCart && (
                    <motion.div
                      className={clsx(
                        "absolute top-0 left-0 right-0 h-full flex justify-between items-center px-2 transition-opacity duration-300",
                        {
                          "opacity-100 pointer-events-auto":
                            hoveredProduct === node.id ||
                            window.innerWidth < 768,
                          "opacity-0 pointer-events-none":
                            hoveredProduct !== node.id &&
                            window.innerWidth >= 768,
                        }
                      )}
                    >
                      <motion.button
                        className="text-white bg-secondary px-2 rounded-sm h-fit mt-2"
                        initial={{ x: window.innerWidth < 768 ? 0 : "100%" }}
                        animate={{ x: 0 }}
                        onClick={() => handleQuantityChange(node.id, 1)}
                      >
                        +
                      </motion.button>
                      <motion.button
                        className="text-white bg-secondary px-2 rounded-sm h-fit mt-2"
                        initial={{ x: window.innerWidth < 768 ? 0 : "-100%" }}
                        animate={{ x: 0 }}
                        onClick={() => handleQuantityChange(node.id, -1)}
                      >
                        -
                      </motion.button>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default Products

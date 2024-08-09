import React, { useState, useEffect } from "react"
import ProductCard from "./ProductCard"
import Alert from "./Alert"
import {
  addToCart,
  getCart,
  getProductFromCart,
  isProductInCart,
  removeFromCart,
  updateCartQuantity,
} from "../utils/cart"

const ProductList = ({ products }) => {
  const [alertMessage, setAlertMessage] = useState("")
  const [cartItems, setCartItems] = useState([])
  const [hoveredProduct, setHoveredProduct] = useState(null)

  useEffect(() => {
    setCartItems(getCart())
  }, [])

  const handleAddToCart = product => {
    console.log({ product })
    addToCart(product)
    setCartItems(getCart())
    setAlertMessage("تم إضافة المنتج إلى السلة!")
  }

  const handleRemove = productId => {
    removeFromCart(productId)
    setCartItems(cartItems.filter(item => item.id !== productId))
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
            <ProductCard
              key={node.id}
              product={node}
              isInCart={isInCart}
              quantity={quantity}
              onAddToCart={handleAddToCart}
              onRemove={handleRemove}
              onQuantityChange={handleQuantityChange}
              hoveredProduct={hoveredProduct}
              setHoveredProduct={setHoveredProduct}
            />
          )
        })}
      </div>
    </div>
  )
}

export default ProductList

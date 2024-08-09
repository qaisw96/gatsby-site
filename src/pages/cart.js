import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import { getCart, removeFromCart, clearCart } from "../utils/cart"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Empty from "../components/Empty"

const Cart = () => {
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    setCartItems(getCart())
  }, [])

  const handleRemove = productId => {
    removeFromCart(productId)
    setCartItems(getCart())
  }

  const handleClearCart = () => {
    clearCart()
    setCartItems([])
  }

  return (
    <Layout>
      <div className="container py-20 h-screen">
        <h1 className="text-2xl font-bold mb-8">سلة المشتريات</h1>
        {cartItems.length ? (
          <>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">الصورة</th>
                  <th className="border p-2">الاسم</th>
                  <th className="border p-2">السعر</th>
                  <th className="border p-2">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(item => (
                  <tr key={item.id}>
                    <td className="border p-2">
                      {item.images && (
                        <GatsbyImage
                          image={getImage(item.images[0])}
                          alt={item.title}
                          className="w-16 h-16"
                        />
                      )}
                    </td>
                    <td className="border p-2">{item.title}</td>
                    <td className="border p-2">{item.price} دينار</td>
                    <td className="border p-2">
                      <button
                        className="text-red-500"
                        onClick={() => handleRemove(item.id)}
                      >
                        إزالة
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded mt-4"
              onClick={handleClearCart}
            >
              مسح السلة
            </button>
          </>
        ) : (
          <Empty
            message="سلة المشتريات فارغة"
            subtitle="يرجى إضافة بعض المنتجات إلى السلة."
            style="!mt-[-200px]"
          />
        )}
      </div>
    </Layout>
  )
}

export default Cart

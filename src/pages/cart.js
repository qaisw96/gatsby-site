import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import { getCart, removeFromCart, clearCart } from "../utils/cart"
import Empty from "../components/Empty"
import { motion } from "framer-motion"
import OrderForm from "../components/OrderForm"
import CartTable from "../components/CartTable"
import Modal from "../components/Modal"

const Cart = () => {
  const [cartItems, setCartItems] = useState([])
  const [isOrderFormVisible, setIsOrderFormVisible] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)

  useEffect(() => {
    setCartItems(getCart())

    if (successMessage === "تم إرسال الطلب بنجاح!") {
      return () => {
        clearCart()
      }
    }
  }, [successMessage])

  const onSubmitOrderForm = async data => {
    setLoading(true)

    const { name, location, mobileNumber } = data

    const items = cartItems.map(item => ({
      sys: { id: item.id },
      fields: {
        title: { "en-US": item.title },
        price: { "en-US": item.price },
        quantity: { "en-US": item.quantity },
      },
    }))

    const payload = {
      fields: {
        name: { "en-US": name },
        location: { "en-US": location },
        mobileNumber: { "en-US": mobileNumber },
        items: { "en-US": items },
      },
    }

    try {
      const response = await fetch(
        `https://api.contentful.com/spaces/${process.env.GATSBY_CONTENTFUL_SPACE_ID}/environments/master/entries`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/vnd.contentful.management.v1+json",
            Authorization: `Bearer ${process.env.GATSBY_CONTENTFUL_API_ACCESS_TOKEN}`,
            "X-Contentful-Content-Type": "orders",
          },
          body: JSON.stringify(payload),
        }
      )

      if (response.ok) {
        setSuccessMessage("تم إرسال الطلب بنجاح!")
        // clearCart()
        // setCartItems([])
        setIsOrderFormVisible(false)
      } else {
        setSuccessMessage("حدث خطأ أثناء إرسال الطلب.")
      }
    } catch (error) {
      setSuccessMessage("حدث خطأ أثناء إرسال الطلب.")
    } finally {
      setLoading(false)
    }
  }

  const handleRemove = productId => {
    removeFromCart(productId)
    setCartItems(getCart())
  }

  const handleClearCart = () => {
    setIsModalVisible(true)
  }

  const handleConfirmClearCart = () => {
    clearCart()
    setCartItems([])
    setIsModalVisible(false)
  }

  const handleOrderClick = () => {
    if (successMessage === "تم إرسال الطلب بنجاح!") return

    setIsOrderFormVisible(prev => !prev)
  }

  return (
    <Layout>
      <div className="container py-20 min-h-screen">
        <h1 className="text-2xl font-bold mb-8">سلة المشتريات</h1>
        {cartItems.length ? (
          <>
            <CartTable cartItems={cartItems} handleRemove={handleRemove} />
            <div className="flex gap-4 mt-4">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded mt-4"
                onClick={handleClearCart}
              >
                مسح السلة
              </button>
              <button
                className="bg-green-500 text-white py-2 px-4 rounded mt-4 ml-4"
                onClick={handleOrderClick}
              >
                الطلب الآن
              </button>
            </div>

            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={
                isOrderFormVisible
                  ? { height: "auto", opacity: 1 }
                  : { height: 0, opacity: 0 }
              }
              transition={{ duration: 0.3 }}
              className="overflow-hidden mt-4"
            >
              {isOrderFormVisible && (
                <OrderForm onSubmit={onSubmitOrderForm} loading={loading} />
              )}
            </motion.div>
            {successMessage && (
              <p className="text-green-500 mt-4">{successMessage}</p>
            )}
          </>
        ) : (
          <Empty
            message="سلة المشتريات فارغة"
            subtitle="يرجى إضافة بعض المنتجات إلى السلة."
            style="!mt-[-200px]"
          />
        )}
      </div>
      <Modal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onConfirm={handleConfirmClearCart}
        message="هل أنت متأكد أنك تريد مسح السلة؟"
      />
    </Layout>
  )
}

export default Cart

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { navigate } from "gatsby"

const Alert = ({ message, onClose }) => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      onClose()
    }, 10000) // 10 seconds

    return () => clearTimeout(timer)
  }, [onClose])

  const handleGoToCart = () => {
    navigate("/cart")
  }

  return (
    visible && (
      <motion.div
        className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p>{message}</p>
        <button
          onClick={handleGoToCart}
          className="mt-2 text-secondary underline"
        >
          انتقل إلى السلة
        </button>
      </motion.div>
    )
  )
}

export default Alert

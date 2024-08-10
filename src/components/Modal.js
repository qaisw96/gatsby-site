import React from "react"
import { motion } from "framer-motion"

const Modal = ({ isVisible, onClose, onConfirm, message }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: "-50%" }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: "-50%" }}
      transition={{ duration: 0.3 }}
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        isVisible ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-lg shadow-lg p-6 z-10 w-full max-w-md mx-4">
        <h2 className="text-lg font-bold mb-4">تأكيد</h2>
        <p className="mb-6">{message}</p>
        <div className="flex justify-end gap-4">
          <button
            className="bg-gray-300 text-black py-2 px-4 rounded"
            onClick={onClose}
          >
            إلغاء
          </button>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded"
            onClick={onConfirm}
          >
            تأكيد
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default Modal

import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const CartTable = ({ cartItems, handleRemove }) => {
  return (
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
  )
}

export default CartTable

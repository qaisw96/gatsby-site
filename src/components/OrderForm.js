import React from "react"

const OrderForm = ({ onSubmit, loading }) => {
  const handleOrderSubmit = event => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const name = formData.get("name")
    const location = formData.get("location")
    const mobileNumber = formData.get("mobileNumber")

    onSubmit({ name, location, mobileNumber })
  }

  return (
    <form onSubmit={handleOrderSubmit} className="mt-4 md:w-1/2">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">الاسم</label>
        <input
          type="text"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
          name="name"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          الموقع
        </label>
        <input
          type="text"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          name="location"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          رقم الهاتف
        </label>
        <input
          type="text"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          name="mobile"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        {loading ? "جاري إرسال الطلب..." : "إرسال الطلب"}
      </button>
    </form>
  )
}

export default OrderForm

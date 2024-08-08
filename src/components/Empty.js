import React from "react"

const Empty = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen mt-[-100px]">
      <svg
        className="w-16 h-16 mb-4 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 7h18M3 12h18M3 17h18M5 7v10M19 7v10"
        ></path>
      </svg>
      <h1 className="text-2xl font-semibold text-gray-600">
        لا توجد منتجات في هذه الفئة
      </h1>
      <p className="text-gray-500 mt-2">
        يرجى التحقق من فئة أخرى أو الرجوع لاحقاً.
      </p>
    </div>
  )
}

export default Empty

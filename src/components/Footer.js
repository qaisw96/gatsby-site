import React from "react"
import { FaFacebookSquare } from "react-icons/fa"
import { FaInstagramSquare } from "react-icons/fa"

const Footer = () => {
  return (
    <div className="bg-secondary">
      <div className="container flex flex-col md:flex-row py-14 text-white gap-12">
        <div className="flex flex-col gap-4">
          <h2>من نحن</h2>
          <div className="h-[.5px] bg-gray-500" />
          <p>متجر اردني يهتم بيبع الاجهزه والاكسسورات المتميزه</p>
        </div>
        <div className="flex flex-col gap-4">
          <h2>روابط مهمة</h2>
          <div className="h-[.5px] bg-gray-500" />

          <div className="flex gap-4">
            <FaFacebookSquare size={25} />
            <FaInstagramSquare size={25} />
          </div>
        </div>
      </div>
      <div className="text-center py-3 bg-third">
        <p className="text-secondary">جميع الحقوق محفوظة © 2024</p>
      </div>
    </div>
  )
}

export default Footer

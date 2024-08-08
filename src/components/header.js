import * as React from "react"
import { Link } from "gatsby"
import { MdStorefront } from "react-icons/md"
import { IoIosSearch } from "react-icons/io"
import { FaCartShopping } from "react-icons/fa6"
import { AiOutlineMenu } from "react-icons/ai"

const Header = ({ siteTitle }) => (
  <header className="bg-primary py-2">
    <div className="container flex justify-between items-center">
      <div className="md:hidden">
        <AiOutlineMenu size={30} color="white" />
      </div>
      <Link to="/" className="flex gap-2 items-center">
        <MdStorefront size={28} color="white" />
        <h1 className="text-white text-xl">4 Store</h1>
      </Link>
      <div className="relative items-center hidden md:flex">
        <input
          className="h-12 rounded-sm px-4 w-[270px] bg-secondary"
          placeholder="ابحث عما تريد"
        />
        <button className="bg-[#3e4756] h-12 px-2 rounded-sm">
          <IoIosSearch
            size={24}
            color="white"
            className=" top-0 right-2 h-full"
          />
        </button>
      </div>
      <div className="flex md:gap-2 p-1 md:py-2 md:px-3 items-center bg-[rgba(0,0,0,.2)]">
        <h3 className="text-white md:hidden">4</h3>
        <div className="p-2 rounded-sm h-full">
          <FaCartShopping size={25} color="white" />
        </div>

        <div className="hidden md:block">
          <h3 className="text-white">سسلة المشتريات</h3>
          <h4 className="text-white">0 منتج - 0 دينار</h4>
        </div>
      </div>
    </div>
  </header>
)

export default Header

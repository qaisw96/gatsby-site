import React, { useEffect, useState } from "react"
import { Link, navigate } from "gatsby"
import { MdStorefront } from "react-icons/md"
import { IoIosSearch } from "react-icons/io"
import { FaCartShopping } from "react-icons/fa6"
import { motion, AnimatePresence } from "framer-motion"
import { useLocation } from "@reach/router"
import { getCart, setCart } from "../utils/cart"

const Header = () => {
  const location = useLocation()
  const urlParams = new URLSearchParams(location.search)
  const query = urlParams.get("query")

  const [searchQuery, setSearchQuery] = useState(query || "")
  const [isMobileSearchVisible, setIsMobileSearchVisible] = useState(false)
  const [cartItems, setCartItems] = useState(getCart())

  const amount = cartItems.reduce((total, item) => total + item.price, 0)

  useEffect(() => {
    setCartItems(getCart())
  }, [])

  const handleSearch = e => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`, {
        state: { isMobileSearchVisible: true },
      })
    }
  }

  const toggleMobileSearch = () => {
    setIsMobileSearchVisible(prev => !prev)
  }

  return (
    <header className="bg-primary py-2">
      <div className="container flex justify-between items-center">
        <div className="md:hidden">
          <IoIosSearch
            size={30}
            color="white"
            onClick={toggleMobileSearch}
            className="cursor-pointer"
          />
        </div>
        <Link to="/" className="flex gap-2 items-center">
          <MdStorefront size={28} color="white" />
          <h1 className="text-white text-xl">4 Store</h1>
        </Link>
        <div className="relative items-center hidden md:flex">
          <form onSubmit={handleSearch} className="flex items-center">
            <input
              className="h-12 rounded-sm px-4 w-[270px] bg-secondary"
              placeholder="ابحث عما تريد"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="bg-[#3e4756] h-12 px-2 rounded-sm">
              <IoIosSearch
                size={24}
                color="white"
                className="top-0 right-2 h-full"
              />
            </button>
          </form>
        </div>
        <Link
          to={"/cart"}
          className="flex md:gap-2 p-1 md:py-2 md:px-3 items-center bg-[rgba(0,0,0,.2)]"
        >
          {/* <h3 className="text-white md:hidden">{cartItems.length}</h3> */}
          <div className="p-2 rounded-sm h-full relative">
            <span className="w-3 h-3 bg-red-400 absolute rounded-full" />
            <FaCartShopping size={25} color="white" />
          </div>

          {/* <div className="hidden md:block">
            <h3 className="text-white">سسلة المشتريات</h3>
            <h4 className="text-white">
              {cartItems.length} منتج - {amount} دينار
            </h4>
          </div> */}
        </Link>
      </div>
      {/* Mobile Search Input */}
      <AnimatePresence>
        {(isMobileSearchVisible || query) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="sticky top-0 z-50 md:hidden bg-secondary"
          >
            <form
              onSubmit={handleSearch}
              className="flex items-center px-4 py-2"
            >
              <input
                className="h-10 w-full rounded-sm px-4 bg-white"
                placeholder="ابحث عما تريد"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="ml-2 bg-[#3e4756] h-10 px-2 rounded-sm"
              >
                <IoIosSearch
                  size={24}
                  color="white"
                  className="top-0 right-2 h-full"
                />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header

import React, { useEffect, useState } from "react"
import { Link, navigate } from "gatsby"
import { MdStorefront } from "react-icons/md"
import { IoIosSearch } from "react-icons/io"
import { FaCartShopping } from "react-icons/fa6"
import { motion, AnimatePresence } from "framer-motion"
import { useLocation } from "@reach/router"
import { getCart } from "../utils/cart"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { useStaticQuery, graphql } from "gatsby"

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      logo: file(relativePath: { eq: "logo.jpg" }) {
        childImageSharp {
          gatsbyImageData(width: 100, layout: CONSTRAINED, placeholder: BLURRED)
        }
      }
    }
  `)

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

  // Get the image data for the logo
  const logoImage = getImage(data.logo)

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
          {logoImage && (
            <GatsbyImage image={logoImage} alt="Logo" className="w-16 h-auto" />
          )}
        </Link>
        <div className="relative items-center hidden md:flex">
          <form onSubmit={handleSearch} className="flex items-center">
            <input
              className="h-12 rounded-sm px-4 w-[270px] bg-third"
              placeholder="ابحث عما تريد"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="bg-secondary h-12 px-2 rounded-sm">
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
          <div className="p-2 rounded-sm h-full relative">
            <span className="w-3 h-3 bg-[#07b5ff] absolute rounded-full" />
            <FaCartShopping size={25} color="white" />
          </div>
        </Link>
      </div>
      <AnimatePresence>
        {(isMobileSearchVisible || query) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="sticky top-0 z-50 md:hidden bg-third"
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
                className="ml-2 bg-secondary h-10 px-2 rounded-sm"
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

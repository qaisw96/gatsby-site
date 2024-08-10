import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { PiWhatsappLogoThin } from "react-icons/pi"
import { motion } from "framer-motion"

import Header from "./header"
import Footer from "./Footer"
import "./layout.css"
import { useLocation } from "@reach/router"

const Layout = ({ children }) => {
  const location = useLocation()

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const variants = {
    hidden: { opacity: 0 },
    enter: { opacity: 1 },
    exit: { opacity: 0 },
  }

  return (
    <>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: `var(--size-content)`,
          padding: `var(--size-gutter)`,
        }}
      >
        <motion.main
          key={location.pathname}
          initial="hidden"
          animate="enter"
          exit="exit"
          variants={variants}
          transition={{ type: "tween", duration: 0.5 }}
        >
          {children}
        </motion.main>
        <Footer />
      </div>
      <a
        href="https://wa.me/+962799771554"
        className="block sticky bottom-4 mr-4 md:bottom-12 md:mr-12 bg-green-400 p-2 w-fit rounded-full"
      >
        <PiWhatsappLogoThin size={40} />
      </a>
    </>
  )
}

export default Layout

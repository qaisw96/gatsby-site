import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import { motion } from "framer-motion"

const Products = ({ products }) => {
  console.log({ products })
  return (
    <div className="container grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 py-20">
      {[...products, ...products, ...products].map(({ node }) => (
        <motion.div
          key={node.id}
          className="bg-white rounded-md"
          // className="w-full mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {node.images && (
            <Link to={`/products/${node.id}`}>
              <GatsbyImage
                image={getImage(node.images[0])}
                alt={node.title}
                className="w-full"
              />
            </Link>
          )}
          <div className="p-4">
            <h2 className="">{node.title}</h2>
            <p className="text-sm text-primary mt-2 font-bold">
              {node.price} دينار
            </p>
            <div className="text-center mt-2 bg-secondary py-2">
              <button className="text-sm rounded-sm">أضف للمشتريات</button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default Products

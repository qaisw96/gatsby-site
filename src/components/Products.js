import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const Products = ({ products }) => {
  return (
    <div className="container grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 py-12">
      {[...products, ...products, ...products].map(({ node }) => (
        <div key={node.id} className="bg-white rounded-md">
          {node.image && (
            <div>
              <GatsbyImage
                image={getImage(node.image)}
                alt={node.title}
                className="w-full"
              />
            </div>
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
        </div>
      ))}
    </div>
  )
}

export default Products

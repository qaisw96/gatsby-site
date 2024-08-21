// src/pages/search.js
import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Products from "../components/Products"
import Layout from "../components/layout"
import Empty from "../components/Empty"

const SearchPage = ({ location }) => {
  const queryParams = new URLSearchParams(location.search)
  const searchTerm = queryParams.get("query") || ""

  const data = useStaticQuery(graphql`
    query {
      allContentfulProducts {
        edges {
          node {
            id
            title
            price
            images {
              gatsbyImageData(layout: CONSTRAINED, width: 300)
            }
          }
        }
      }
    }
  `)

  const products = data.allContentfulProducts.edges

  const filteredProducts = products.filter(({ node }) => {
    const term = searchTerm.toLowerCase()
    return node.title.toLowerCase().includes(term)
    // ||
    // (node.description?.description
    //   &&
    //   node.description.description.toLowerCase().includes(term))
  })

  return (
    <Layout>
      <div className="container py-12">
        <h1 className="text-2xl font-bold mb-4">
          نتائج البحث لـ "{searchTerm}"
        </h1>

        <div>
          {filteredProducts.length > 0 && searchTerm ? (
            <Products products={filteredProducts} />
          ) : (
            <Empty
              title="لا توجد نتائج بحث"
              message="لم يتم العثور على أي منتجات تتطابق مع مصطلح البحث الخاص بك."
            />
          )}
        </div>
      </div>
    </Layout>
  )
}

export default SearchPage

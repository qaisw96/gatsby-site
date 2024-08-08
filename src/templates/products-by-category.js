import React from "react"
import { graphql } from "gatsby"
import Products from "../components/Products"
import Layout from "../components/layout"
import Categories from "../components/Categories"

const ProductsByCategoryPage = ({ data, pageContext }) => {
  const products = data.allContentfulProducts.edges

  const { categoryId } = pageContext

  return (
    <Layout>
      <Categories categoryId={categoryId} />
      <Products products={products} />
    </Layout>
  )
}

export const query = graphql`
  query ($categoryId: String!) {
    allContentfulProducts(filter: { categoryId: { id: { eq: $categoryId } } }) {
      edges {
        node {
          id
          title
          price
          image {
            gatsbyImageData(layout: CONSTRAINED, width: 300)
          }
        }
      }
    }
  }
`

export default ProductsByCategoryPage

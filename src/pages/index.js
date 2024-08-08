import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Categories from "../components/Categories"
import Products from "../components/Products"
import Empty from "../components/Empty"

const IndexPage = ({ data }) => {
  const categories = data.allContentfulCategories.edges
  const products = data.allContentfulProducts.edges
  console.log({ categories })

  return (
    <Layout>
      <Categories />
      {products.length === 0 ? <Empty /> : <Products products={products} />}
    </Layout>
  )
}

export const query = graphql`
  query {
    allContentfulCategories {
      edges {
        node {
          id
          name
          products {
            id
          }
        }
      }
    }
    allContentfulProducts {
      edges {
        node {
          id
          title
          images {
            gatsbyImageData(layout: CONSTRAINED, width: 300)
          }
          price
          categoryId {
            id
            name
          }
        }
      }
    }
  }
`

export const Head = () => <Seo title="Home" />

export default IndexPage

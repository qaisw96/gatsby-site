import React from "react"
import { graphql } from "gatsby"
import Products from "../components/Products"
import Layout from "../components/layout"
import Categories from "../components/Categories"
import ProductImages from "../components/ProductImages"

const Product = ({ data, pageContext }) => {
  const product = data.allContentfulProducts.edges[0]

  const description = product.node?.description?.description
  console.log({ description })

  return (
    <Layout>
      <div
        className="container flex py-14 justify-center gap-8"
        style={{ justifyContent: "center" }}
      >
        <div className="flex-1">
          <ProductImages images={product.node.images} />
        </div>
        <div className="flex-1">
          <h2 className="text-xl">{product.node.title}</h2>
          <p
            className="text-base mt-6"
            style={{
              color: "GrayText",
              fontSize: 15,
              fontWeight: 300,
              marginTop: 30,
            }}
          >
            {description}
          </p>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query ($productId: String!) {
    allContentfulProducts(filter: { id: { eq: $productId } }) {
      edges {
        node {
          id
          title
          price
          images {
            id
            gatsbyImageData(layout: CONSTRAINED, width: 300)
          }
          description {
            description
          }
        }
      }
    }
  }
`

export default Product

import React from "react"
import { graphql } from "gatsby"
import Products from "../components/Products"
import Layout from "../components/layout"
import Categories from "../components/Categories"
import ProductImages from "../components/ProductImages"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS, MARKS } from "@contentful/rich-text-types"

const Product = ({ data, pageContext }) => {
  const product = data.allContentfulProducts.edges[0]

  const description = product.node?.content?.raw

  const options = {
    renderMark: {
      [MARKS.BOLD]: text => <span style={{ fontWeight: "bold" }}>{text}</span>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p style={{ marginTop: 12, marginBottom: 12 }}>{children}</p>
      ),
      [BLOCKS.HEADING_1]: (node, children) => <h1>{children}</h1>,
      [BLOCKS.HEADING_2]: (node, children) => <h2>{children}</h2>,
      [BLOCKS.HEADING_3]: (node, children) => <h3>{children}</h3>,
      [BLOCKS.QUOTE]: (node, children) => <blockquote>{children}</blockquote>,
      [BLOCKS.LIST_ITEM]: (node, children) => <li>{children}</li>,
      [BLOCKS.HR]: (node, children) => (
        <hr style={{ marginTop: 14, marginBottom: 14 }} />
      ),
    },
  }

  return (
    <Layout>
      <div
        className="container flex flex-col md:flex-row py-14 justify-center gap-8"
        style={{ justifyContent: "center" }}
      >
        <div className="flex-1">
          <ProductImages images={product.node.images} />
        </div>
        <div className="flex-1">
          <h2 className="text-xl">{product.node.title}</h2>
          {description && (
            <div
              className="text-base mt-6"
              style={{
                color: "GrayText",
                fontSize: 15,
                fontWeight: 300,
                marginTop: 30,
              }}
            >
              {documentToReactComponents(JSON.parse(description), options)}
            </div>
          )}
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
          content {
            raw
          }
        }
      }
    }
  }
`

export default Product

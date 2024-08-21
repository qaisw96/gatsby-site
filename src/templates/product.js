import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import Products from "../components/Products"
import Layout from "../components/layout"
import Categories from "../components/Categories"
import ProductImages from "../components/ProductImages"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import ProductActions from "../components/ProductActions"
import {
  addToCart,
  getProductFromCart,
  isProductInCart,
  removeFromCart,
  updateCartQuantity,
  getCart,
} from "../utils/cart"
import Alert from "../components/Alert"

const Product = ({ data, pageContext }) => {
  const product = data.allContentfulProducts.edges[0]

  const description = product.node?.content?.raw

  const isInCart = isProductInCart(product.node.id)
  const quantity = getProductFromCart(product.node.id)?.quantity || 0

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
      [BLOCKS.TABLE]: (node, children) => (
        <table
          className="w-full border-collapse border-gray-600"
          style={{ direction: "ltr", textAlign: "end" }}
        >
          {children}
        </table>
      ),
    },
  }

  const [alertMessage, setAlertMessage] = useState("")
  const [cartItems, setCartItems] = useState([])
  const [hoveredProduct, setHoveredProduct] = useState(null)

  useEffect(() => {
    setCartItems(getCart())
  }, [])

  const handleAddToCart = product => {
    console.log({ product })
    addToCart(product)
    setCartItems(getCart())
    setAlertMessage("تم إضافة المنتج إلى السلة!")
  }

  const handleRemove = productId => {
    removeFromCart(productId)
    setCartItems(cartItems.filter(item => item.id !== productId))
    setAlertMessage("تم إزالة المنتج من السلة!")
  }

  const handleQuantityChange = (productId, change) => {
    updateCartQuantity(productId, change)
    setCartItems(getCart())
  }

  const handleAlertClose = () => {
    setAlertMessage("")
  }

  return (
    <Layout>
      {alertMessage && (
        <Alert message={alertMessage} onClose={handleAlertClose} />
      )}
      <div
        className="container flex flex-col md:flex-row py-14 justify-center gap-8"
        style={{ justifyContent: "center" }}
        onMouseEnter={() => setHoveredProduct(product.node.id)}
        onMouseLeave={() => setHoveredProduct(null)}
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
                maxWidth: 600,
              }}
            >
              {documentToReactComponents(JSON.parse(description), options)}
            </div>
          )}
          <ProductActions
            key={product.node.id}
            product={product.node}
            isInCart={isInCart}
            quantity={quantity}
            onAddToCart={handleAddToCart}
            onRemove={handleRemove}
            onQuantityChange={handleQuantityChange}
            hoveredProduct={hoveredProduct}
            setHoveredProduct={setHoveredProduct}
            productId={product.node.id}
            isProductPage
          />
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
          content {
            raw
          }
        }
      }
    }
  }
`

export default Product

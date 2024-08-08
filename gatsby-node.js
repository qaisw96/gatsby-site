const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const categoryResult = await graphql(`
    {
      allContentfulCategories {
        edges {
          node {
            id
          }
        }
      }
    }
  `)

  if (categoryResult.errors) {
    console.error(categoryResult.errors)
    return
  }

  const categoryTemplate = path.resolve(
    "./src/templates/products-by-category.js"
  )

  categoryResult.data.allContentfulCategories.edges.forEach(({ node }) => {
    createPage({
      path: `/products-by-category/${node.id}`,
      component: categoryTemplate,
      context: {
        categoryId: node.id,
      },
    })
  })

  const productResult = await graphql(`
    {
      allContentfulProducts {
        edges {
          node {
            id
          }
        }
      }
    }
  `)

  if (productResult.errors) {
    console.error(productResult.errors)
    return
  }

  const productTemplate = path.resolve("./src/templates/product.js")

  productResult.data.allContentfulProducts.edges.forEach(({ node }) => {
    createPage({
      path: `/products/${node.id}`,
      component: productTemplate,
      context: {
        productId: node.id,
      },
    })
  })
}

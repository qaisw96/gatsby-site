const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // Query all categories to create pages
  const result = await graphql(`
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

  if (result.errors) {
    console.error(result.errors)
    return
  }

  const categoryTemplate = path.resolve(
    "./src/templates/products-by-category.js"
  )

  result.data.allContentfulCategories.edges.forEach(({ node }) => {
    createPage({
      path: `/products-by-category/${node.id}`,
      component: categoryTemplate,
      context: {
        categoryId: node.id,
      },
    })
  })
}

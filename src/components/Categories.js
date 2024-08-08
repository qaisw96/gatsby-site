import React, { useEffect, useRef } from "react"
import { graphql, useStaticQuery, Link } from "gatsby"

const Categories = ({ categoryId }) => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulCategories {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  `)

  const categories = data.allContentfulCategories?.edges || []
  const categoryRefs = useRef([])

  useEffect(() => {
    const selectedCategoryIndex = categories.findIndex(
      ({ node }) => node.id === categoryId
    )
    if (selectedCategoryIndex !== -1) {
      categoryRefs.current[selectedCategoryIndex].scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      })
    }
  }, [categoryId, categories])

  if (!categories.length) {
    return <p>No categories available.</p>
  }

  return (
    <div className="shadow-md sticky top-0 bg-white z-10">
      <div className="container py-3 flex gap-6 overflow-auto">
        {categories.map(({ node }, index) => (
          <Link
            to={`/products-by-category/${node.id}`}
            key={node.id}
            className={`border border-primary px-4 py-1 md:py-2 md:px-10 rounded-full whitespace-nowrap cursor-pointer ${
              node.id === categoryId ? "bg-primary text-white" : ""
            }`}
            ref={el => (categoryRefs.current[index] = el)}
          >
            <h3>{node.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Categories

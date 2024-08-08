import React from "react"
import { useState } from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { motion } from "framer-motion"

const ProductImages = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0])

  return (
    <div className="flex flex-col items-center">
      <motion.div
        key={selectedImage.id}
        className="w-full mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <GatsbyImage
          image={getImage(selectedImage)}
          alt="Product Image"
          className="w-full md:w-[400px] md:h-[400px] rounded-md"
        />
      </motion.div>

      {images.length > 1 && (
        <div className="flex space-x-2 gap-2">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              className={`w-16 h-16 cursor-pointer border-2 rounded-sm ${
                selectedImage.id === image.id
                  ? "border-primary"
                  : "border-transparent"
              } hover:border-blue-500 transition-all duration-300`}
              onClick={() => setSelectedImage(image)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <GatsbyImage
                image={getImage(image)}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductImages

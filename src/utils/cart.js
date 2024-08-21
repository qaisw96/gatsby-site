import { navigate } from "gatsby"

export const getCart = () => {
  if (typeof window !== "undefined") {
    const cart = localStorage.getItem("cart")
    return cart ? JSON.parse(cart) : []
  }
  return []
}

export const addToCart = product => {
  if (typeof window !== "undefined") {
    const cart = getCart()
    const productIndex = cart.findIndex(item => item.id === product.id)

    if (productIndex > -1) {
      // Product is already in the cart, increase the quantity
      cart[productIndex].quantity += 1
    } else {
      // Product is not in the cart, add it with quantity 1
      product.quantity = 1
      cart.push(product)
    }

    localStorage.setItem("cart", JSON.stringify(cart))
  }
}

export const removeFromCart = productId => {
  if (typeof window !== "undefined") {
    let cart = getCart()
    cart = cart.filter(item => item.id !== productId)
    localStorage.setItem("cart", JSON.stringify(cart))
  }
}

export const clearCart = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("cart")
  }
}

export const setCart = cart => {
  localStorage.setItem("cart", JSON.stringify(cart))
}

export const isProductInCart = productId => {
  if (typeof window !== "undefined") {
    const cart = getCart()
    return cart.find(item => item.id === productId) !== undefined
  }
  return false
}

export const getProductFromCart = productId => {
  if (typeof window !== "undefined") {
    const cart = getCart()
    return cart.find(item => item.id === productId) || null
  }
  return null
}

export const updateCartQuantity = (productId, change) => {
  if (typeof window !== "undefined") {
    const cart = getCart()
    const updatedCart = cart
      .map(item =>
        item.id === productId
          ? {
              ...item,
              quantity: item.quantity + change,
              optimalPrice: calculateOptimalPrice(
                item.offers,
                item.quantity + change
              ),
            }
          : item
      )
      .filter(item => item.quantity > 0) // Remove items with quantity 0
    localStorage.setItem("cart", JSON.stringify(updatedCart))
  }
}

export const parseOffers = offersString => {
  if (!offersString) return null
  return offersString.split(",").reduce((acc, offer) => {
    const [quantity, price] = offer.split(":").map(item => item.trim())
    acc[quantity] = parseFloat(price)
    return acc
  }, {})
}

export const calculateOptimalPrice = (offers, quantity) => {
  // Sort offers by price per item (cheapest first)
  const sortedOffers = Object.entries(offers).sort(
    ([qtyA, priceA], [qtyB, priceB]) => priceA / qtyA - priceB / qtyB
  )

  let totalQuantity = quantity
  let totalPrice = 0

  // Greedily apply offers from best to worst
  for (const [offerQuantity, offerPrice] of sortedOffers) {
    const numOffers = Math.floor(totalQuantity / offerQuantity)
    totalPrice += numOffers * offerPrice
    totalQuantity -= numOffers * offerQuantity
  }

  // Handle any remaining items without a specific offer
  if (totalQuantity > 0) {
    const [smallestQty, smallestPrice] = sortedOffers[0]
    totalPrice += (totalQuantity / smallestQty) * smallestPrice
  }

  return totalPrice
}

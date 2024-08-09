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
          ? { ...item, quantity: item.quantity + change }
          : item
      )
      .filter(item => item.quantity > 0) // Remove items with quantity 0
    localStorage.setItem("cart", JSON.stringify(updatedCart))
  }
}

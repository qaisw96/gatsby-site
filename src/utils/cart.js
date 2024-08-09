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
    const updatedCart = [...cart, product]
    localStorage.setItem("cart", JSON.stringify(updatedCart))
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

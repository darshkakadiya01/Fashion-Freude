import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
});
  const addToCart = (product) => {

    const exist = cart.find(item => item._id === product._id);

    if (exist) {

      setCart(
        cart.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );

    } else {

      setCart([
        ...cart,
        {
          ...product,
          quantity: 1
        }
      ]);

    }

  };

  const removeFromCart = (id) => {

    setCart(
      cart.filter(item => item._id !== id)
    );

  };

  const increaseQty = (id) => {

    setCart(
      cart.map(item =>
        item._id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );

  };

  const decreaseQty = (id) => {

    setCart(
      cart.map(item =>
        item._id === id
          ? {
              ...item,
              quantity:
                item.quantity > 1
                  ? item.quantity - 1
                  : 1   
            }
          : item
      )
    );

  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
}, [cart]);

const clearCart = () => {

    setCart([]);

    localStorage.removeItem("cart");

};

  return (

    <CartContext.Provider
      value={{
          cart,
          addToCart,
          removeFromCart,
          increaseQty,
          decreaseQty,
          clearCart
      }}
    >

      {children}

    </CartContext.Provider>

  );

};

export const useCart = () => useContext(CartContext);
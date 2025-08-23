// src/CartContext.js

import React, { createContext, useReducer, useContext } from 'react';

const CartContext = createContext();

const initialState = {
  items: [],
};

const cartReducer = (state, action) => {
  let updatedItems;
  let existingCartItemIndex;
  let existingCartItem;

  switch (action.type) {
    case 'ADD_ITEM':
      existingCartItemIndex = state.items.findIndex((item) => item.id === action.payload.id);
      existingCartItem = state.items[existingCartItemIndex];
      if (existingCartItem) {
        const updatedItem = { ...existingCartItem, quantity: existingCartItem.quantity + 1 };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat({ ...action.payload, quantity: 1 });
      }
      return { ...state, items: updatedItems };

    case 'DECREASE_ITEM':
      existingCartItemIndex = state.items.findIndex((item) => item.id === action.payload.id);
      existingCartItem = state.items[existingCartItemIndex];
      if (existingCartItem.quantity === 1) {
        // If quantity is 1, remove the item completely
        updatedItems = state.items.filter(item => item.id !== action.payload.id);
      } else {
        // Otherwise, just decrease the quantity
        const updatedItem = { ...existingCartItem, quantity: existingCartItem.quantity - 1 };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      }
      return { ...state, items: updatedItems };

    case 'REMOVE_ITEM':
      // Filter out the item with the matching id
      updatedItems = state.items.filter(item => item.id !== action.payload.id);
      return { ...state, items: updatedItems };

    case 'CLEAR_CART':
      // Reset the items array to be empty
      return { ...state, items: [] };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Define the clearCart function that dispatches the CLEAR_CART action
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const cartContext = {
    items: state.items,
    addItem: (item) => dispatch({ type: 'ADD_ITEM', payload: item }),
    decreaseItem: (item) => dispatch({ type: 'DECREASE_ITEM', payload: item }),
    removeItem: (item) => dispatch({ type: 'REMOVE_ITEM', payload: item }),
    // Add the clearCart function to the context so other components can use it
    clearCart: clearCart, 
  };

  return (
    <CartContext.Provider value={cartContext}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
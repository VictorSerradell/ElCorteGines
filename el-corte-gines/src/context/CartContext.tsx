import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
} from "react";
import type { CartItem, Product } from "../types";

type CartState = {
  cart: CartItem[];
  totalItems: number;
  totalPrice: number;
};

type CartAction =
  | { type: "ADD_TO_CART"; payload: Product }
  | { type: "REMOVE_FROM_CART"; payload: number } // id
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "CLEAR_CART" };

const initialState: CartState = {
  cart: [],
  totalItems: 0,
  totalPrice: 0,
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id,
      );
      let newCart: CartItem[];

      if (existingItem) {
        newCart = state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        newCart = [...state.cart, { ...action.payload, quantity: 1 }];
      }

      return {
        ...state,
        cart: newCart,
        totalItems: state.totalItems + 1,
        totalPrice: state.totalPrice + action.payload.price,
      };
    }

    case "REMOVE_FROM_CART": {
      const itemToRemove = state.cart.find(
        (item) => item.id === action.payload,
      );
      if (!itemToRemove) return state;

      const newCart = state.cart.filter((item) => item.id !== action.payload);
      return {
        ...state,
        cart: newCart,
        totalItems: state.totalItems - itemToRemove.quantity,
        totalPrice:
          state.totalPrice - itemToRemove.price * itemToRemove.quantity,
      };
    }

    case "UPDATE_QUANTITY": {
      const { id, quantity } = action.payload;
      const item = state.cart.find((i) => i.id === id);
      if (!item || quantity < 1) return state;

      const diff = quantity - item.quantity;
      const newCart = state.cart.map((i) =>
        i.id === id ? { ...i, quantity } : i,
      );

      return {
        ...state,
        cart: newCart,
        totalItems: state.totalItems + diff,
        totalPrice: state.totalPrice + diff * item.price,
      };
    }

    case "CLEAR_CART":
      return initialState;

    default:
      return state;
  }
};

// Helper para calcular totals (por si queremos recalcular)
const calculateTotals = (cart: CartItem[]) => ({
  totalItems: cart.reduce((sum, item) => sum + item.quantity, 0),
  totalPrice: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
});

const CartContext = createContext<
  | {
      state: CartState;
      addToCart: (product: Product) => void;
      removeFromCart: (id: number) => void;
      updateQuantity: (id: number, quantity: number) => void;
      clearCart: () => void;
    }
  | undefined
>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState, () => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      const parsed = JSON.parse(saved);
      const { totalItems, totalPrice } = calculateTotals(parsed.cart);
      return { cart: parsed.cart, totalItems, totalPrice };
    }
    return initialState;
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify({ cart: state.cart }));
  }, [state.cart]);

  const addToCart = (product: Product) =>
    dispatch({ type: "ADD_TO_CART", payload: product });
  const removeFromCart = (id: number) =>
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  const updateQuantity = (id: number, quantity: number) =>
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  return (
    <CartContext.Provider
      value={{ state, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de CartProvider");
  return context;
};

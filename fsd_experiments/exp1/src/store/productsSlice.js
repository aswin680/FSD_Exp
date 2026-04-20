import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [
    { id: 1, name: 'Premium Wireless Headphones', price: 299.99, category: 'Electronics' },
    { id: 2, name: 'Mechanical Keyboard', price: 149.99, category: 'Peripherals' },
    { id: 3, name: '4K Ultra HD Monitor', price: 499.99, category: 'Electronics' },
  ],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.items.push(action.payload);
    },
    updateProduct: (state, action) => {
      const index = state.items.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    removeProduct: (state, action) => {
      state.items = state.items.filter(p => p.id !== action.payload);
    },
  },
});

export const { addProduct, updateProduct, removeProduct } = productsSlice.actions;
export default productsSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [
      { id: 1, name: 'Laptop', price: 999 },
      { id: 2, name: 'Phone', price: 699 }
    ]
  },
  reducers: {
    addProduct: (state, action) => {
      state.items.push(action.payload);
    },
    updateProduct: (state, action) => {
      const index = state.items.findIndex(p => p.id === action.payload.id);
      if (index !== -1) state.items[index] = action.payload;
    },
    removeProduct: (state, action) => {
      state.items = state.items.filter(p => p.id !== action.payload);
    }
  }
});

export const { addProduct, updateProduct, removeProduct } = productsSlice.actions;
export default productsSlice.reducer;

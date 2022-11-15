
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: JSON.parse(localStorage.getItem('products')) || [],
  editedProduct: [],
  editedIndex: '',
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getProducts: (state, action) => {
      const products = action.payload
      state.products = products
      
    },
    addProduct: (state, action) => {
        const product = action.payload
        state.products = [...state.products, product]
    },
    editData: (state, action) => {
        const productId = action.payload
        const productIndex = state.products.findIndex(product => product.id === productId)
        state.editedIndex = productIndex
        state.editedProduct = state.products[productIndex]
    },
    editProduct: (state, action) => {
      state.products.splice(state.editedIndex, 1, action.payload)
    },
    deleteProduct: (state, action) => {
        const user = state.products.filter(product => product.id !== action.payload)
        state.products = user
      },
  },
})


export const { getProducts, addProduct, editData, editProduct, deleteProduct } = productsSlice.actions

export default productsSlice.reducer
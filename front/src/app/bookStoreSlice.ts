import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface BookStoreState {
   order: any[],
   orderCost: string | null,
   booksInShop: any[] | null,
}

const initialState = {
   order: [],
   orderCost: null,
   booksInShop: null,
} as BookStoreState

export const bookStoreSlice = createSlice({
   name: "bookStore",
   initialState,
   reducers: {
      booksInShopSave(state: any, action: PayloadAction<any>) {
         if (action.payload) {
            state.booksInShop = action.payload
         } else {
            state.booksInShop = initialState.booksInShop
         }
      },
      orderSave(state: any, action: PayloadAction<any>) {
         if (action.payload) {
            state.order = action.payload
         } else {
            state.order = initialState.order
         }
      },
      orderCostSave(state: any, action: PayloadAction<any>) {
         if (action.payload) {
            state.orderCost = action.payload
         } else {
            state.orderCost = initialState.order
         }
      }
   }
})

export const { booksInShopSave, orderSave, orderCostSave } = bookStoreSlice.actions

export const selectbooksInShop = (state: RootState) => state.bookStore.booksInShop
export const selectOrder = (state: RootState) => state.bookStore.order
export const selectOrderCost = (state: RootState) => state.bookStore.orderCost

export default bookStoreSlice.reducer
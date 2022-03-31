import React, { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { booksInShopSave, selectbooksInShop } from "../../app/bookStoreSlice";

import { Book } from "../Book/Book";

import "./StoreMain.scss"

export const StoreMain: FC = () => {
   const dispatch = useAppDispatch()
   const booksInShop = useAppSelector(selectbooksInShop)

   const getBooksData = async () => {
      const response = await fetch("/api/book")
      const result = await response.json()

      dispatch(booksInShopSave(result.data))
   }

   useEffect(() => {
      getBooksData()
   }, [])

   return <main>
      {booksInShop ? booksInShop.map((book, index) => {
         return <Book bookData={book} key={index} />
      }) : ""}
   </main>
}

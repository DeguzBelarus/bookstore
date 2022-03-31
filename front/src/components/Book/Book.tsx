import React, { FC, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { orderSave, selectOrder } from "../../app/bookStoreSlice";

import "./Book.scss"
interface Props {
   bookData: any
}

export const Book: FC<Props> = ({ bookData }) => {
   const dispatch = useAppDispatch()
   let currentOrder = useAppSelector(selectOrder)

   const book: any = useRef(null)
   const titleSpan: any = useRef(null)
   const authorSpan: any = useRef(null)
   const idSpan: any = useRef(null)
   const pagesSpan: any = useRef(null)

   const bookInfoShow = () => {
      titleSpan.current.style.opacity = "1"
      authorSpan.current.style.opacity = "1"
      idSpan.current.style.opacity = "1"
      pagesSpan.current.style.opacity = "1"
   }

   const bookInfoHide = () => {
      titleSpan.current.style.opacity = "0"
      authorSpan.current.style.opacity = "0"
      idSpan.current.style.opacity = "0"
      pagesSpan.current.style.opacity = "0"
   }

   const addToCart = () => {
      const key = new Date().getTime()

      bookData = { ...bookData, key }
      currentOrder = [...currentOrder, bookData]
      dispatch(orderSave(currentOrder))
   }

   return <div className="book-container" onMouseOver={bookInfoShow
   } onMouseOut={bookInfoHide}>
      <img className="cover-image" src={bookData.cover_url} alt="book image" ref={book} />

      <p className="title-paragraph" ref={titleSpan}>{bookData.title}</p>
      <p className="author-paragraph" ref={authorSpan}>{bookData.author}</p>
      <span className="id-span" ref={idSpan}>{`Book №: ${bookData.id}`}</span>
      <span className="pages-span" ref={pagesSpan}>{`Pages: ${bookData.pages}`}</span>
      <span className="price-span">{`${bookData.price} PLN`}</span>

      <div className="add-button" onClick={addToCart}>Add TO CART</div>
   </div>
}

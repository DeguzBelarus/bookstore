import React, { FC, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { orderSave, selectOrder } from "../../app/bookStoreSlice";

import "./OrderItem.scss"
interface Props {
   bookData: any
}

export const OrderItem: FC<Props> = ({ bookData }) => {
   const bookImage: any = useRef(null)

   const dispatch = useAppDispatch()
   let currentOrder = useAppSelector(selectOrder)

   const removeItem = (event: any) => {
      currentOrder = currentOrder.filter((book) => book.key !== bookData.key)
      dispatch(orderSave(currentOrder))
      console.log(currentOrder);
   }

   const selectOrderItem = (event: any) => {
      bookImage.current.style.width = "130px"
      bookImage.current.style.height = "195px"
      bookImage.current.style.zIndex = "2"
   }

   const usSelectOrderItem = () => {
      bookImage.current.style.width = "30px"
      bookImage.current.style.height = "45px"
      bookImage.current.style.zIndex = "0"
   }

   return <div className="order-item-wrapper" onMouseOver={selectOrderItem
   } onMouseOut={usSelectOrderItem}>
      <img className="book-preview-image" src={bookData.cover_url} alt="book preview image" ref={bookImage} />
      <span className="item-title">{bookData.title}</span>
      <span className="item-cost">{`${bookData.price} PLN`}</span>
      <div className="remove-button" onClick={removeItem}>remove</div>
   </div>
}
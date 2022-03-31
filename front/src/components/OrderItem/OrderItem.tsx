import React, { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { orderSave, selectOrder } from "../../app/bookStoreSlice";

import "./OrderItem.scss"

interface Props {
   bookData: any
}

export const OrderItem: FC<Props> = ({ bookData }) => {
   const dispatch = useAppDispatch()
   let currentOrder = useAppSelector(selectOrder)

   const removeItem = (event: any) => {
      currentOrder = currentOrder.filter((book) => book.key !== bookData.key)
      dispatch(orderSave(currentOrder))
      console.log(currentOrder);
   }

   return <div className="order__item__wrapper">
      <span className="item-title">{bookData.title}</span>
      <span className="item-cost">{bookData.price}</span>
      <div className="remove-button" onClick={removeItem}>remove</div>
   </div>
}
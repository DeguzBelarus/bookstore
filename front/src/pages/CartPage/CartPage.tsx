import React, { FC, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectOrder, orderCostSave } from "../../app/bookStoreSlice";

import { OrderItem } from "../../components/OrderItem/OrderItem";

import "./CartPage.scss"

export const CartPage: FC = () => {
   const acceptButton: any = useRef(null)

   const dispatch = useAppDispatch()
   const currentOrder = useAppSelector(selectOrder)
   const navigate = useNavigate()

   const cost = currentOrder.reduce((sum, book) => Number(sum + book.price), [])

   const acceptingOrder = () => {
      if (!currentOrder.length) return

      navigate("/order")
   }

   const returnToShop = () => {
      navigate("/")
   }

   useEffect(() => {
      dispatch(orderCostSave(cost))
   }, [])

   useEffect(() => {
      if (!currentOrder.length) {
         acceptButton.current.style.color = "gray"
         acceptButton.current.style.cursor = "default"
         return
      }

      acceptButton.current.style.color = "green"
      acceptButton.current.style.cursor = "pointer"

      const cost = currentOrder.reduce((sum, book) => Number(sum + book.price), [])
      dispatch(orderCostSave(cost))

   }, [currentOrder])

   return <div className="cart-wrapper">
      <div className="cart">
         {currentOrder.length ? currentOrder.map((book, index) => {
            return <OrderItem bookData={book} key={index
            } />
         }) : "There are no products in the cart..."}
         <span className="cost-total-span">{`Total: ${cost != 0 ? cost : "0"} PLN`}</span>

         <div className="buttons-container">
            <div className="back-button" onClick={returnToShop}>Back</div>
            <div className="next-button" ref={acceptButton} onClick={acceptingOrder}>NEXT</div>
         </div>
      </div>
   </div>
}

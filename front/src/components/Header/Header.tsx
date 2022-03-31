import React, { FC } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectOrder } from "../../app/bookStoreSlice";
import { useNavigate } from "react-router-dom";

import "./Header.scss"

export const Header: FC = () => {
   const order = useAppSelector(selectOrder)
   const navigate = useNavigate()

   const cartEntering = () => {
      navigate("/cart")
   }

   return <header>
      <nav><span>The Bookstore</span></nav>
      <div className={order.length ? "cart-button-notempty" : "cart-button"} onClick={cartEntering}>{`Shoping Cart: ${order.length} items`}</div>
   </header >
}

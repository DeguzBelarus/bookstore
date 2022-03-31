import React, { FC } from "react";
import { Header } from "../../components/Header/Header";
import { StoreMain } from "../../components/StoreMain/StoreMain";

import "./MainPage.scss"

export const MainPage: FC = () => {
   return <div className="shop__wrapper">
      <Header />
      <StoreMain />
   </div>

}

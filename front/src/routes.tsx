import { Route, Routes } from "react-router-dom"
import { MainPage } from "./pages/MainPage/MainPage";
import { CartPage } from "./pages/CartPage/CartPage";
import { OrderPage } from "./pages/OrderPage/OrderPage";

export const useRoutes = () => {
   return <Routes>
      <Route path="/" element={<MainPage />}></Route>
      <Route path="/cart" element={<CartPage />}></Route>
      <Route path="/order" element={<OrderPage />}></Route>
      <Route path="*" element={<MainPage />}></Route>
   </Routes>
}

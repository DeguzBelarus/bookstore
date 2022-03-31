import React, { FC, useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import { orderSave, selectOrderCost, selectOrder } from "../../app/bookStoreSlice";

import "./OrderPage.scss"

export const OrderPage: FC = () => {
   const submitButton: any = useRef(null)

   const dispatch = useAppDispatch()
   const navigate = useNavigate()

   const cost = useAppSelector(selectOrderCost)
   let order = useAppSelector(selectOrder)
   const [formData, setFormData] = useState({ first_name: "", last_name: "", city: "", zip_code: "" })
   const [transferData, setTransferData] = useState(false)
   const [message, setMessage] = useState("")
   const [orderConfirmed, setOrderConfirmed] = useState(false)
   const [clearMessageTimeout, setClearMessageTimeout]: any = useState(null)

   const formDataUpdate = (event: any) => {
      setFormData({ ...formData, [event.target.name]: event.target.value })
   }

   const formSubmit = async (event: any) => {
      event.preventDefault()
      setTransferData(true)

      order = order
         .map((book, index, array) => {
            const id = book.id

            return {
               id: id,
               quantity: array.filter((book) => book.id === id).length
            };
         })
         .sort((previous, next) => {
            if (previous.id > next.id) {
               return 1;
            }

            if (previous.id < next.id) {
               return -1;
            }

            return 0;
         })
         .reduce((unique: any, book) => {
            return unique.find((element: any) => element.id === book.id) ? unique : [...unique, book]
         }, [])

      let data: any = { order: order, ...formData }
      data = JSON.stringify(data)

      const response = await fetch("/api/order", {
         method: "POST",
         body: data,
         headers: {
            "Content-Type": "application/json"
         }
      })

      const result = await response.json()
      setTransferData(false)

      if (!response.ok) {
         setMessage(result.error.message)
      } else {
         setOrderConfirmed(true)
         setMessage("Order confirmed!")
         dispatch(orderSave([]))
      }

      if (clearMessageTimeout) {
         clearTimeout(clearMessageTimeout)
      }

      const clearMessageTimeoutCurrent: any = setTimeout(() => {
         setMessage("")
         navigate("/")
      }, 5000)
      setClearMessageTimeout(clearMessageTimeoutCurrent)
   }

   const returnToCart = () => {
      navigate("/cart")
   }

   useEffect(() => {
      if (transferData) {
         submitButton.current.style.backgroundColor = "orange"
      } else {
         submitButton.current.style.backgroundColor = "green"
      }
   }, [transferData])

   return <div className="order-wrapper">
      {!orderConfirmed ? <form id="userdata-form" onSubmit={formSubmit}>
         <h2 className="order-header">Order Details:</h2>
         <h3 className="order-cost-header">{`Amount: ${cost} PLN`}</h3>

         <label htmlFor="firstname-input">Name:</label>
         <input id="firstname-input" type="text" title="enter your first name" name="first_name" placeholder="4-50 letters" minLength={4} maxLength={50} required onChange={formDataUpdate} />

         <label htmlFor="surname-input">Surname:</label>
         <input id="surname-input" type="text" title="enter your surname" name="last_name" placeholder="5-50 letters" minLength={5} maxLength={50} required onChange={formDataUpdate} />

         <label htmlFor="city-input">City:</label>
         <input id="city-input" type="text" title="enter your city" name="city" required onChange={formDataUpdate} />

         <label htmlFor="postalcode-input">Zip code:</label>
         <input id="postalcode-input" type="text" placeholder="format: 11-111" title="enter your zip code" name="zip_code" pattern="\d{2}-\d{3}" required onChange={formDataUpdate} />

         <div className="buttons-container">
            <button type="button" id="return-button" onClick={returnToCart}><span>Back</span></button>
            <button type="submit" id="formsubmit-button" ref={submitButton}><span>{!transferData ? "I ORDER AND PAY" : "Processing..."}</span></button>
         </div>

         <p className="message-paragraph">{message !== "" ? message : ""}</p>
      </form>
         :
         <div>
            <h2 className="message-paragraph-confirmed">{message !== "" ? message : ""}</h2>
            <h5>You will be redirected to the main page.</h5>
         </div>
      }
   </div>
}

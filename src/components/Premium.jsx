import React from 'react'
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Premium = () => {

  const clickBuyHandler = async(type) => {
    try {
      console.log("Sending request with membershipType:", type); // Debugging line
      const order = await axios.post(
        BASE_URL + "/payment/create",
        {
          membershipType: type,
        },
        {
          withCredentials: true,
        }
      );
      const { keyId, amount, currency, notes, orderId } = order.data;

      const options = {
        key: keyId, // Replace with your Razorpay key_id
        amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency,
        name: "DevTinder",
        description: "Test Transaction",
        order_id: orderId, // This is the order_id created in the backend

        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: notes.emailId,
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      console.log("Order created successfully:", order.data); // Debugging line
    } catch (error) {
      console.error("Error creating order:", error.response?.data || error.message); // Debugging line
    }
  };

  

  return (
    <div className="m-10">
      <div className="flex w-full ">
        <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
          <h1 className="font-bold text-3xl">Silver Membership</h1>
          <ul>
            <li>-Chat with other people</li>
            <li>-100 connections per day</li>
            <li>-Blue tick</li>
            <li>-3 months</li>
          </ul>
          <button
            onClick={() => clickBuyHandler("silver")}
            className="btn btn-secondary"
          >
            Buy Silver
          </button>
        </div>
        <div className="divider divider-horizontal">OR</div>
        <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
          <h1 className="font-bold text-3xl">Gold Membership</h1>
          <ul>
            <li>-Chat with other people</li>
            <li>-Infinite connections per day</li>
            <li>-Blue tick</li>
            <li>-6 months</li>
          </ul>
          <button
            onClick={() => clickBuyHandler("gold")}
            className="btn btn-primary"
          >
            Buy Gold
          </button>
        </div>
      </div>
    </div>
  );
}

export default Premium
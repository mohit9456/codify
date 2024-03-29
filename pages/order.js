import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Order from '../models/order';
import mongoose from 'mongoose';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Head from 'next/head'

const MyOrder = ({order, clearCart}) => {
  const products = order.products
  const router = useRouter()
  const [date, setDate] = useState()
  
  useEffect(() => {

    const d = new Date(order.createdAt)
    setDate(d)
    if(router.query.clearCart == 1){
      clearCart();
      
    }
  
  }, [])

  const trackOrder = () => {
    toast.warn("Thanks for your order. your order is unshipped yet !!", {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  }



  return (
    <div>
      <Head>
        <title>Order be ready - codify.com</title>
        <meta name="description" content="Codify.com- wear the code " />
        
      </Head>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        />
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">CODIFY.COM</h2>
              <h1 className="text-gray-900 text-xl md:text-3xl title-font font-medium mb-4">Order id: #{order.orderId}</h1>
              <p className="leading-relaxed mb-2 font-semibold text-green-700">Yeah !! Order has been succesfully Placed ! </p>
              
              <p className='leading-relaxed mb-4'>Order placed on : <span className='font-semibold text-slate-700'>{date && date.toLocaleString("en-IN", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'})}</span></p>
              <p className='leading-relaxed mb-4'>Your Payment Status is <span className='font-semibold text-slate-700'>{order.status}</span></p>
              <div className="flex mb-4">
                <a className="flex-auto border-b-2 border-gray-300 py-2 text-md px-1">Item Description</a>
                {/* <a className="flex-grow border-b-2 border-gray-300 py-2 ml-10 text-md pl-14">Quantity</a> */}
                <a className="flex-auto border-b-2 border-gray-300 py-2 ml-10 text-md pl-14">Item Total</a>
              </div>

              {Object.keys(products).map((key) => {
                 return <div key={key} className="flex border-t border-gray-200 py-2">
                  <span className="flex-wrap max-w-full md:w-56 w-48 text-gray-500">{products[key].name}({products[key].size}/{products[key].variant})</span>
                  {/* <span className="m-auto text-gray-900">{products[key].qty}</span> */}
                  <span className="text-center m-auto text-gray-900">₹{products[key].price} X {products[key].qty} = ₹{products[key].price * products[key].qty}.00</span>
                </div>
              })}
            
              <div className="flex mt-10">
                <span className="title-font font-medium text-2xl text-gray-900">Total Amount: ₹{order.amount}.00</span>
                <button onClick={trackOrder} className="flex ml-auto text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">Track Order</button>
              </div>
            </div>
            <img alt="ecommerce" className=" lg:w-1/2 w-full lg:h-auto lg:h-55 md:h-34 sm:h-34 object-cover object-center rounded sm:pt-9" src="https://m.media-amazon.com/images/I/71Lfw7bAmvL._AC_UY1100_.jpg" />
          </div>
        </div>
      </section>
    </div>
  )
}



export async function getServerSideProps(context) {

  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }

  let order = await Order.findById(context.query.id)


  return {
    props: { order: JSON.parse(JSON.stringify(order))}
  }
}

export default MyOrder

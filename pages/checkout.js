import React, { useEffect, useState } from 'react'
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { BsFillBagCheckFill } from 'react-icons/bs';
import Link from 'next/link';
import Head from 'next/head';
import Script from 'next/script';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'



const Checkout = ({ cart, clearCart, addToCart, removeFromCart, subTotal }) => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [pincode, setPincode] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [user, setUser] = useState({value: null})

  useEffect(() => {
      if (name.length > 3 && email.length > 3 && phone.length > 3 && pincode.length > 3 && address.length > 3) {
        setDisabled(false)
      }
      else {
        setDisabled(true)
      }

  }, [name, email, phone, pincode, address])
  


  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem('myuser'));
    if(myuser && myuser.token){
      setUser(myuser)
      setEmail(myuser.email)
      fetchData(myuser.token)
      
    }
  }, [])

  const fetchData = async(token) => {
        
    let data = {token: token}     
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let res = await a.json();
    setName(res.name)
    setAddress(res.address)
    setPhone(res.phone)
    setPincode(res.pincode)
    getPinCode(res.pincode)
  }


  const getPinCode = async(pin) => {
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`)
        let pinjson = await pins.json();
        if(Object.keys(pinjson).includes((pin))){
          setState(pinjson[pin][1])
          setCity(pinjson[pin][0])
        }else{
          setState('')
          setCity('')
        }
  }
  

  const handleChange = async (e) => {
    if (e.target.name == 'name') {
      setName(e.target.value)
    }
    else if (e.target.name == 'email') {
      setEmail(e.target.value)
    }
    else if (e.target.name == 'phone') {
      setPhone(e.target.value)
    }
    else if (e.target.name == 'address') {
      setAddress(e.target.value)
    }
    else if (e.target.name == 'pincode') {
      setPincode(e.target.value)
      if(e.target.value.length == 6){
        getPinCode(e.target.value)
      }else{
        setState('')
        setCity('')
      }
    }

  }


  const inititePayment = async () => {

    const data = { cart, subTotal, email, name, address, pincode, phone, city, state };
    const orderRes = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/razorpay`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const orderDetails = await orderRes.json();
    console.log(orderDetails);
    if(orderDetails.success){
    var options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
      amount: orderDetails.amount,
      currency: "INR",
      name: "CODIFY- wear the code",
      description: "Test Transaction",
      image: "https://img.lovepik.com/element/45007/9562.png_860.png",
      order_id: orderDetails.id,
      callback_url: `${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`,
      prefill: {
        name: "Our Customer",
        // email: "gaurav.kumar@example.com",
        // contact: "9999999999",
      },
      notes: {
        address: "India",
      },
      theme: {
        color: "#3399cc",
      },
    };

    
    var paymentObject = new Razorpay(options);
    paymentObject.open();
  }else{
    if(orderDetails.cartClear){
      clearCart();
    }
    toast.warn(orderDetails.error, {
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
  };


  return (
    <div className='container m-auto min-h-screen'>
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

      <Head>
      <title>CheckOut the Order - codify.com</title>
        <meta
          name="description"
          content="Correct way to use Razorpay in NextJS."
        />
        <meta name="author" content="Pratham Sharma" />

      </Head>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <h1 className='text-3xl font-bold my-8 text-center'>Checkout</h1>
      <h2 className='font-semibold text-xl my-6'>1. Delivery Details</h2>
      <div className="lg:w-1/2 md:w-2/3 mx-auto">
        <div className="flex mx-auto my-4">
          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
              <input onChange={handleChange} value={name} type="text" id="name" name="name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
              {user && user.token ? <input value={user.email} readOnly type="email" id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" /> : <input onChange={handleChange} value={email} type="email" id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" /> }
              
            </div>
          </div>
        </div>
        <div className="px-2 w-full">
          <div className="mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Address</label>
            <textarea onChange={handleChange} value={address} name="address" id="address" cols="30" rows="2" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></textarea>
          </div>
        </div>

        <div className="flex mx-auto my-4">
          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
              <input placeholder='your 10 digit phone number' onChange={handleChange} value={phone} type="text" id="phone" name="phone" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pincode</label>
              <input onChange={handleChange} value={pincode} type="email" id="pincode" name="pincode" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
        </div>
        <div className="flex mx-auto my-4">
          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
              <input onChange={handleChange} value={state} readOnly={true} type="text" id="state" name="state" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
              <input onChange={handleChange} readOnly={true}  value={city} type="email" id="city" name="city" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
        </div>

      </div>

      <h2 className='font-semibold text-xl my-6'>2. Reveiw cart items & Pay</h2>
      <div className="sideCart bg-pink-100 my-4 p-6">
        <ol className='list-decimal font-semibold'>
          {Object.keys(cart).length == 0 && <div className='my-3 font-semibold'>Oops ! Your cart is Empty</div>}
          {Object.keys(cart).map((k) => {
            return <li key={k}>
              <div className="item flex my-5">
                <div className=' font-semibold '>{cart[k].name}({cart[k].size}/{cart[k].variant}) </div>
                <div className="flex font-semibold items-center justify-center w-1/3"><AiFillMinusCircle onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size) }} className='mx-2 text-2xl  text-pink-500 cursor-pointer' />{cart[k].qty}<AiFillPlusCircle onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size) }} className='mx-2 text-2xl  text-pink-500 cursor-pointer' /></div>
              </div>

            </li>
          })}
          <span className="total font-bold text-md">Total amount is : ₹{subTotal}</span>
        </ol>
      </div>

      <Link href={"/checkout"}><button disabled={disabled} onClick={inititePayment} className="disabled:bg-pink-300 flex text-white mr-2 bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm"><BsFillBagCheckFill className='m-1' />Pay ₹{subTotal} </button></Link>



    </div>
  )
}

export default Checkout

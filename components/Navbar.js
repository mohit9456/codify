import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AiOutlineShoppingCart, AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { MdAccountCircle } from 'react-icons/md';
import { BsFillBagCheckFill } from 'react-icons/bs';
import { Ref } from 'react';
import { useRouter } from 'next/router';


const Navbar = ({logout, user, cart, addToCart, removeFromCart, clearCart, subTotal}) => {

  const [dropdown, setDropdown] = useState(false)
  const [sidebar, setSidebar] = useState(false)
  const router = useRouter()

  useEffect(() => {
    Object.keys(cart).length != 0 && setSidebar(true);
    let exempted = ['/order', '/orders', '/myaccount', '/checkout', '/forgot', '/', '/login', '/signup', '/contact', '/about']
    if(exempted.includes(router.pathname)){
      setSidebar(false)
    }
  }, [])
  

  const toggleCart = () => {
    setSidebar(!sidebar);
  }

 

  const ref = useRef()

  return (
    <>
    {!sidebar && <span className='fixed top-4 right-14 z-30 cursor-pointer' onMouseOver={() => {setDropdown(true)}} onMouseLeave={() => {setDropdown(false)}}>
          {dropdown &&  <div className="absolute right-7 shadow-lg bg-black top-6 py-4 rounded-md px-5 w-32 z-30">
            <ul>
              <Link href={'/myaccount'}><li className='text-white py-1 text-sm font-semibold hover:text-pink-500'>My Account</li></Link>          
              <Link href={'/orders'}><li className=' text-white py-1 font-semibold text-sm hover:text-pink-500'>My Orders</li></Link>  
              <li onClick={logout} className='text-white py-1 text-sm font-semibold hover:text-pink-500'>Logout</li>
            </ul>
          </div>}
          <span>
          {user.value && <MdAccountCircle className='text-xl md:text-3xl mx-4' />}
          </span>
          
    </span>}
    <div className={`flex flex-col justify-center items-center md:flex-row md:justify-start py-2 shadow-md sticky top-0 z-10 bg-white ${! sidebar && 'overflow-hidden'}`}>
      <div className="logo mr-auto md:mx-5">
        <Link href={'/'}><Image src="/logo_1.png" alt="" width={150} height={40} /></Link>
      </div>
      <div className="nav">
        <ul className='flex items-center space-x-14 font-bold md:text-md md:ml-6'>
          <Link href={'/tshirts'}><li className='hover:text-pink-500'>Tshirts</li></Link>
          <Link href={'/hoodies'}><li className='hover:text-pink-500'>Hoodies</li></Link>
          <Link href={'/stickers'}><li className='hover:text-pink-500'>Stickers</li></Link>
          <Link href={'/mugs'}><li className='hover:text-pink-500'>Mugs</li></Link>
        </ul>
      </div>
      <div className="cart items-center absolute right-0 top-4 mx-5 cursor-pointer flex ">
        
        
        {!user.value && <Link href={'/login'}>
          <button className='bg-pink-600 px-2 py-1 mr-2 rounded-md md:mr-4 text-md font-semibold text-white hover:bg-pink-500'>Login</button>
        </Link>}
        
        
        <AiOutlineShoppingCart onClick={toggleCart} className='text-xl md:text-3xl' />
      </div>
      <div ref={ref} className={`w-72 h-[100vh] sideCart overflow-y-scroll absolute top-0  bg-pink-100 py-10 px-8 transition-all ${sidebar ? 'right-0' : '-right-96' } `}>
        <h2 className='font-bold text-xl text-center'>Shopping Cart</h2>
        <span onClick={toggleCart} className="absolute top-5 right-2"><AiFillCloseCircle className='cursor-pointer text-2xl text-pink-500' /></span>
        <ol className='list-decimal font-semibold'>
          {Object.keys(cart).length == 0 && <div className='my-3 font-semibold'>Oops ! Your cart is Empty</div>}
          {Object.keys(cart).map((k) => {return <li key={k}>
            <div className="item flex my-5">
              <div className='w-2/3 font-semibold '>{cart[k].name}({cart[k].size}/{cart[k].variant}) </div>
              <div className="flex font-semibold items-center justify-center w-1/3"><AiFillMinusCircle onClick={ ()=> {removeFromCart(k , 1, cart[k].price,  cart[k].name, cart[k].size )}} className='mx-2 text-2xl  text-pink-500 cursor-pointer' />{cart[k].qty}<AiFillPlusCircle onClick={ ()=> {addToCart(k , 1, cart[k].price,  cart[k].name, cart[k].size )}} className='mx-2 text-2xl  text-pink-500 cursor-pointer' /></div>
            </div>

          </li>})}
        </ol>
        <div className='flex'>
          <Link  href={"/checkout"}><button disabled={Object.keys(cart).length === 0} className="disabled:bg-pink-300 flex text-white mr-2 bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm"><BsFillBagCheckFill className='m-1' />Checkout</button></Link>
          <button disabled={Object.keys(cart).length === 0} onClick={clearCart} className="disabled:bg-pink-300 flex text-white mr-2 bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm">Clear Cart</button>
        </div>

      </div>

    </div>
    </>
  )
}

export default Navbar

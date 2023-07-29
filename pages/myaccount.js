import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Head from 'next/head'

const MyAccount = () => {


  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [pincode, setPincode] = useState('')
  const [address, setAddress] = useState('')
  const [user, setUser] = useState({value: null})
  const [password, setPassword] = useState('')
  const [cpassword, setCpassword] = useState('')
  const [npassword, setNpassword] = useState('')

    let router = useRouter();

    useEffect(() => {
      const myuser = JSON.parse(localStorage.getItem('myuser'));
    
        if(!myuser){
            router.push('/login')
        }
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
      }


      const handlUserSubmit = async () => {
        
        let data = {token: user.token, name, address, phone, pincode}
        
        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`,
          {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        let res = await a.json();
        if(res.success){
          toast.success("SuccessFully updated Details !", {
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
        
        
      }

      const handlPasswordSubmit = async () => {
        let res;
        
        let data = {token: user.token, password, cpassword, npassword}
        if(cpassword == npassword){
          let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updatepassword`,
          {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        res = await a.json();
        }else{
        res = {success: false}
        }
        
        
        if(res.success){
          toast.success("SuccessFully updated password !", {
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
        else{
          toast.error("Invalid password credentials !", {
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

        setPassword('')
        setCpassword('')
        setNpassword('')
        
        
      }





      const handleChange = async (e) => {
        if (e.target.name == 'name') {
          setName(e.target.value)
        }
        else if (e.target.name == 'phone') {
          setPhone(e.target.value)
        }
        else if (e.target.name == 'address') {
          setAddress(e.target.value)
        }
        else if (e.target.name == 'pincode') {
          setPincode(e.target.value)
        }
        else if (e.target.name == 'password') {
          setPassword(e.target.value)
        }
        else if (e.target.name == 'cpassword') {
          setCpassword(e.target.value)
        }
        else if (e.target.name == 'npassword') {
          setNpassword(e.target.value)
        }
    
      }

    
  return (
    <div className='container mx-auto my-9 min-h-screen'>
      <Head>
        <title>My Account - codify.com</title>
        <meta name="description" content="codify.com- wear the code " />
        
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
      <h1 className='text-3xl text-center font-bold'>Update your Account </h1>
      <h2 className='font-semibold text-xl my-6 mt-9 text-center underline'> Delivery Details</h2>
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
              <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email(cannot be updated)</label>
              {user && user.token ? <input value={user.email} type="email" id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly /> : <input onChange={handleChange} value={email} type="email" id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" /> }
              
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
        <button onClick={handlUserSubmit} className= "flex ml-3 text-white mr-2 bg-pink-500 border-0 py-2 px-6 mb-4 focus:outline-none hover:bg-pink-600 rounded text-sm">Submit </button>
        
        <h2 className='font-semibold text-xl my-6 text-center underline'> Change the Password</h2>
        <div className="flex mx-auto my-4">
          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
              <input onChange={handleChange} value={password} type="password" id="password" name="password" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label htmlFor="npassword" className="leading-7 text-sm text-gray-600">New Password</label>
              <input onChange={handleChange} value={npassword} type="password" id="npassword" name="npassword" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
          <div className="px-2 w-1/2">
            <div className="mb-4">
            <label htmlFor="cpassword" className="leading-7 text-sm text-gray-600">Confirm Password</label>
              <input onChange={handleChange} value={cpassword} type="password" id="cpassword" name="cpassword" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
              
            </div>
          </div>
        </div>
        <button onClick={handlPasswordSubmit} className= "flex ml-3 text-white mr-2 bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded text-sm">Submit </button>

      </div>
      
    </div>
  )
}



export default MyAccount

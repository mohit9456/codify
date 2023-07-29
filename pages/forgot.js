import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Head from 'next/head'


const Forgot = () => {
  const router = useRouter()

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push('/')
    }
  }, [])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCpassword] = useState('')

  const handleChange = (e) => {
    if (e.target.name == 'email') {
      setEmail(e.target.value)
    }
    else if (e.target.name == 'password') {
      setPassword(e.target.value)
    }
    else if (e.target.name == 'cpassword') {
      setCpassword(e.target.value)
    }
  }


  const resetEmailPassword = async () => {
    const data = { email };
    const a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {

      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }
    );
    setEmail('')
    const res = await a.json();
    if(res.success){
      toast.success("Link has been sent in your Email id", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }else{
      toast.error("User doesn't exist.. please try again !!", {
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





  const resetPassword = async () => {
    let id = router.query.id;
    let tkn = router.query.token;
    
    const deta = { password, cpassword, id, tkn };
    if (password === cpassword) {
      const b = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/reset`, {

        method: "POST",
        body: JSON.stringify(deta),
        headers: {
          "Content-Type": "application/json",
        },
      }
      );
      const res = await b.json();
      if(res.success){
        toast.success("Your password has been reset successfully !!", {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      }else{
        toast.error(res.error, {
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
    }else{
      toast.error("Password is not matched !!", {
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
  }



  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden pb-28">
      <Head>
        <title>Forgot password - codify.com</title>
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
      <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">

        <img className='mx-auto h-12 w-auto' src='/logo-1.png' />
        <h1 className="text-3xl font-bold text-center text-black-700">Forgot Password</h1>

        {!router.query.token &&
          <div>
            <div className="mb-4 mt-5">
              <label htmlFor="email" className="block text-sm font-semibold text-black-800">
                Email
              </label>
              <input onChange={handleChange} value={email} placeholder='Email address' id='email' name='email' type="email" autoComplete='email' required className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40" />
            </div>
            <div className="mt-2">
              <button onClick={resetEmailPassword} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-pink-700 rounded-md hover:bg-pink-600 focus:outline-none focus:bg-gray-600">
                Continue
              </button>
            </div>
          </div>
        }
        {router.query.token &&
          <div>
            <div className="mb-4 mt-5">
              <label htmlFor="password" className="block text-sm font-semibold text-black-800">New Password</label>
              <input onChange={handleChange} value={password} id='password' name='password' autoComplete='password' required placeholder='reset password'
                type="password"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40" />
            </div>
            <div className="mb-4">
              <label htmlFor="cpassword" className="block text-sm font-semibold text-black-800">Confirm New Password</label>
              <input onChange={handleChange} value={cpassword} id='cpassword' autoComplete='cpassword'  name='cpassword' required placeholder='Confirm password'
                type="password"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mt-2">
              <button disabled={password !== cpassword} onClick={resetPassword} className="disabled:bg-pink-300 w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-pink-700 rounded-md hover:bg-pink-600 focus:outline-none focus:bg-gray-600">
                Continue
              </button>
              {cpassword && password !== cpassword &&
              <span className='text-red-700'>password not match</span>}
              {password && password === cpassword &&
              <span className='text-green-600'>password matched</span>}
            </div>
          </div>
        }
        
        <p className="mt-4 text-sm text-center text-gray-700">
          <Link
            href="/login"
            className="font-medium text-blue-600 hover:underline"
          >
            or Sign in your Account
          </Link>
        </p>
      </div>
    </div>
  )
}



export default Forgot
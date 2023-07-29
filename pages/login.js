import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head'

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  useEffect(() => {
    if(localStorage.getItem("myuser")){
      router.push('/')
    }
  
  }, [])
  

  const handleChange = (e) => {
    if(e.target.name == 'email'){
      setEmail(e.target.value)
    }
    else if(e.target.name == 'password'){
      setPassword(e.target.value)
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, password }
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let response = await res.json()
    // console.log(response)
    setEmail('')
    setPassword('')

    if(response.success){
      localStorage.setItem("myuser", JSON.stringify({token: response.token, email: response.email}))
      toast.success('You are successfully logged in your Account', {
        position: "top-left",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
        setTimeout(() => {
          router.push(process.env.NEXT_PUBLIC_HOST)
        }, 1000)
      
    }
    else{
      toast.error('Invalid Credentials', {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
    
  }

  return (
    <div>
      <Head>
        <title>Login - codify.com</title>
        <meta name="description" content="codify.com- wear the code " />
        
      </Head>
      <ToastContainer
        position="top-left"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        />
      <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
          <img className='mx-auto h-12 w-auto' src='/logo-1.png' />
          <h1 className="text-3xl font-bold text-center text-black-700">Sign in to your account</h1>
          <form onSubmit={handleSubmit} className="mt-6" method='POST'>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-black-800"
              >
                Email
              </label>
              <input onChange={handleChange} value={email} name='email' id='email' placeholder='Email address'
                type="email" required
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-black-800"
              >
                Password
              </label>
              <input onChange={handleChange} id='password' value={password} name='password' placeholder='Password'
                type="password" required
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <Link
              href="/forgot"
              className="text-xs text-pink-700 hover:underline"
            >
              Forget Password?
            </Link>
            <div className="mt-2">
              <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-pink-700 rounded-md hover:bg-pink-600 focus:outline-none focus:bg-gray-600">
                Login
              </button>
            </div>
          </form>

          <p className="mt-4 text-sm text-center text-gray-700">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-blue-600 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login

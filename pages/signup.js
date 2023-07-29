import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head'

const Signup = () => {


  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push('/')
    }

  }, [])


  const handleChange = (e) => {
    if (e.target.name == 'name') {
      setName(e.target.value)
    }
    else if (e.target.name == 'email') {
      setEmail(e.target.value)
    }
    else if (e.target.name == 'password') {
      setPassword(e.target.value)
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, email, password }
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let response = await res.json()
    setEmail('')
    setName('')
    setPassword('')

    if (response.success) {
      localStorage.setItem("myuser", JSON.stringify({ token: response.token, email: response.email }))
      toast.success('Your Account has been created ', {
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

    setTimeout(() => {
      router.push(process.env.NEXT_PUBLIC_HOST);
    }, 2000);

  }

  return (
    <div>
      <Head>
        <title>Signup- codify.com</title>
        <meta name="description" content="Codify.com- wear the code " />
        
      </Head>

      <ToastContainer
        position="top-left"
        autoClose={2000}
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
          <h1 className="text-3xl font-bold text-center text-black-700">Sign up to your account</h1>
          <form onSubmit={handleSubmit} className="mt-6" method='POST'>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-black-800"
              >
                Display Name
              </label>
              <input required name='name' value={name} onChange={handleChange} placeholder='Display name' id='name'
                type="name"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-black-800"
              >
                Email
              </label>
              <input required name='email' value={email} onChange={handleChange} placeholder='Email address' id='email'
                type="email"
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
              <input required name='password' value={password} onChange={handleChange} placeholder='Password' id='password'
                type="password"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mt-2">
              <button
                type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-pink-700 rounded-md hover:bg-pink-600 focus:outline-none focus:bg-gray-600">
                Signup
              </button>
            </div>
          </form>

          <p className="mt-4 text-sm text-center text-gray-700">
            Already have account?{" "}
            <Link
              href="/login"
              className="font-medium text-blue-600 hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup

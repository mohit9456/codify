import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import mongoose from 'mongoose'
import Error from 'next/error'
import Product from '../../models/product'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Head from 'next/head'


const Post = ({buyNow, addToCart, product, variants, error }) => {
  const router = useRouter()
  const { slug } = router.query

  const [pin, setPin] = useState()
  const [service, setService] = useState()
  const [color, setColor] = useState()
  const [size, setSize] = useState()

  useEffect(() => {
   if(!error){
    setColor(product.color);
    setSize(product.size)
   }
  }, [router.query])
  

  const checkService = async() => {
    
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`)
    let pinjson = await pins.json()

    if(Object.keys(pinjson).includes((pin))){
      setService(true)
      toast.success("Your Pincode is Servicable !", {
        position : "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        pauseOnHover: true,
        progress: undefined,
      })
    }
    else{
      setService(false)
      toast.error("Sorry, Pincode not Servicable !", {
        position : "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        pauseOnHover: true,
        progress: undefined,
      })
    }
  }

  const onChangePin = (e) => {
    setPin(e.target.value)
  }

  const refreshVariant = ( newColor, newSize ) => {
    let url = `${process.env.NEXT_PUBLIC_HOST}/product/${variants[newColor][newSize]['slug']}`
    router.push(url)
  }

  if(error == 404){
    return <Error statusCode={404}/>
  }

  return (
    <>
      <Head>
        <title>see all items as best selling products - codify.com</title>
        <meta name="description" content="codify.com- wear the code " />
        
      </Head>
      <section className="text-gray-600 body-font overflow-hidden min-h-screen">
        <ToastContainer
        position='bottom-center'
        outToClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
         />
        <div className="container px-5 py-16 mx-auto ">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto px-24 object-cover object-top rounded" src={product.img} />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">CODIFY</h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.title}({product.size}/{product.color})</h1>
                <div className="flex mb-4">


                </div>
                <p className="leading-relaxed">{product.desc}</p>
                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                  <div className="flex">
                    <span className="mr-3">Color</span>
                    { Object.keys(variants).includes('white') && Object.keys(variants["white"]).includes(size) && <button onClick={() => {refreshVariant('white', size)}} className={`border-2 rounded-full w-6 h-6 focus:outline-none ${color === 'white' ? "border-black" : "border-gray-300"}`}></button>}
                    { Object.keys(variants).includes('red') && Object.keys(variants["red"]).includes(size) && <button onClick={() => {refreshVariant('red', size)}} className={`border-2 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none ${color === 'red' ? "border-black" : "border-gray-300"}`}></button>}
                    { Object.keys(variants).includes('yellow') && Object.keys(variants["yellow"]).includes(size) && <button onClick={() => {refreshVariant('yellow', size)}} className={`border-2 ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none ${color === 'yellow' ? "border-black" : "border-gray-300"}`}></button>}
                    { Object.keys(variants).includes('green') && Object.keys(variants["green"]).includes(size) && <button onClick={() => {refreshVariant('green', size)}} className={`border-2 ml-1 bg-green-500 rounded-full w-6 h-6 focus:outline-none ${color === 'green' ? "border-black" : "border-gray-300"}`}></button>}
                    { Object.keys(variants).includes('blue') && Object.keys(variants["blue"]).includes(size) && <button onClick={() => {refreshVariant('blue', size)}} className={`border-2 ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none ${color === 'blue' ? "border-black" : "border-gray-300"}`}></button>}

                  </div>
                  <div className="flex ml-6 items-center">
                    <span className="mr-3">Size</span>
                    <div className="relative">
                      <select value={size} onChange={(e) => {refreshVariant(color, e.target.value)}} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 text-base pl-3 pr-10">
                        {color && Object.keys(variants[color]).includes("S") && <option value={"S"}>S</option>}
                        {color && Object.keys(variants[color]).includes("M") && <option value={"M"}>M</option>}
                        {color && Object.keys(variants[color]).includes("L") && <option value={"L"}>L</option>}
                        {color && Object.keys(variants[color]).includes("XL") && <option value={"XL"}>XL</option>}
                        {color && Object.keys(variants[color]).includes("XXL") && <option value={"XXL"}>XXL</option>}
                  
                      </select>
                      <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                          <path d="M6 9l6 6 6-6"></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex">
                  {product.availableQty <=0 && <span className="title-font font-medium text-2xl text-gray-900">Out of stock !</span>}
                  {product.availableQty > 0 && <span className="title-font font-medium text-2xl text-gray-900">₹{product.price}.00</span>}
                  <button disabled={product.availableQty <=0} onClick={() => {buyNow(slug, 1, product.price, product.title, size, color )}}  className=" disabled:bg-pink-300 flex ml-8 text-white bg-pink-500 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-pink-600 rounded">Buy Now</button>
                  <button onClick={() => {addToCart(slug, 1, product.price, product.title, size, color )}} disabled={product.availableQty <=0} className="disabled:bg-pink-300 flex ml-4 text-white bg-pink-500 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-pink-600 rounded">Add to Cart</button>


                </div>
                <div className="pin mt-6 flex space-x-2 text-sm">
                  <input onChange={onChangePin} placeholder='Enter your pincode' type="text" className='px-2 border-2 border-gray-400 rounded-md' />
                  <button onClick={checkService} className='flex ml-4 text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded'>Check Availability</button>
                </div>
                {(! service && service !=null ) && <div className='text-red-700 text-sm mt-3'>
                  Sorry ! We do not deliver to this pincode yet..
                </div>}
                {(service && service !=null ) && <div className='text-green-700 text-sm mt-3'>
                  Yay ! This pincode is servicable..
                </div>}
              </div>
          </div>
        </div>
      </section>
    </>
  )
}

export async function getServerSideProps(context) {

  let error = null;

  if(!mongoose.connections[0].readyState){
    await mongoose.connect(process.env.MONGO_URI)
  }

  let product = await Product.findOne({slug: context.query.slug})
  if(product == null){
    return {
      props : { error: 404},
    }
  }

  let variants = await Product.find({ title: product.title, category: product.category })
  let colorSizeSlugs = {}
  for(let item of variants){
    if(Object.keys(colorSizeSlugs).includes(item.color)){
      colorSizeSlugs[item.color][item.size] = { slug : item.slug }
    }
    else{
      colorSizeSlugs[item.color] = {}
      colorSizeSlugs[item.color][item.size] = {slug :item.slug } 
    }
  }


  return {
    props : { error: error, product: JSON.parse(JSON.stringify(product)), variants: JSON.parse(JSON.stringify(colorSizeSlugs)) },
  }
}

export default Post

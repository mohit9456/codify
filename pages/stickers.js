import React from 'react'
import Link from 'next/link'
import Product from '../models/product';
import mongoose from 'mongoose';
import Head from 'next/head'


const Stickers = ({products}) => {
    return (
      <div>
        <Head>
        <title>see the collections of Stickers in codeswear.com</title>
        <meta name="description" content="Codeswear.com- wear the code " />
        <link rel="icon" href="./favicon.ico" />
      </Head>
        <section className="text-gray-600 body-font min-h-screen">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap -m-4 justify-center mx-5">
              { Object.keys(products).length === 0 && <p className='font-bold'>Sorry all the Stickers are currently out of stock. New stock coming soon ! Stay tuned. </p>}
              { Object.keys(products).map((item) => {
              
              return<Link key={products[item]._id} passHref={true} legacyBehavior href={`/product/${products[item].slug}`}>
                <div className="lg:w-1/4 md:w-1/2 p-4 w-full cursor-pointer shadow-lg m-4">
                  <a className="block relative rounded overflow-hidden">
                    <img alt="ecommerce" className="h-[30vh] m-auto md:h-[40vh] block" src={products[item].img} />
                  </a>
                  <div className="mt-4 text-center">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">STICKERS</h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">{products[item].title}</h2>
                    <p className="mt-1">₹{products[item].price}</p>
                    <div className="mt-1">
                        {products[item].size.includes('S') && <span className='border border-gray-300 px-1 mx-1'>S</span>}
                        {products[item].size.includes('M') && <span className='border border-gray-300 px-1 mx-1'>M</span>}
                        {products[item].size.includes('XL') && <span className='border border-gray-300 px-1 mx-1'>XL</span>}
                        {products[item].size.includes('XXL') && <span className='border border-gray-300 px-1 mx-1'>XXL</span>}
                    </div>
                    <div className="mt-1">
                        {products[item].color.includes('red') && <button className="border-2 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                        {products[item].color.includes('yellow') && <button className="border-2 ml-1 border-gray-300 bg-yellow-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                        {products[item].color.includes('green') && <button className="border-2 ml-1 border-gray-300 bg-green-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                        {products[item].color.includes('black') && <button className="border-2 ml-1 border-gray-300 bg-black-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                    </div>
                  </div>
                </div>
              </Link>})}
            </div>
          </div>
        </section>
      </div>
    )
  }


export async function getServerSideProps(context) {

    if(!mongoose.connections[0].readyState){
      await mongoose.connect(process.env.MONGO_URI)
    }
  
    let products = await Product.find({category: 'stickers'})
    let stickers = {}
          for(let item of products){
                  if(item.title in stickers){
                          if(!stickers[item.title].color.includes(item.color) && item.availableQty > 0){
                            stickers[item.title].color.push(item.color)
                          }
                          if(!stickers[item.title].size.includes(item.size) && item.availableQty > 0){
                            stickers[item.title].size.push(item.size)
                          }
                          
                  }
                  else{
                    stickers[item.title] = JSON.parse(JSON.stringify(item))
                          if(item.availableQty > 0){
                            stickers[item.title].color = [item.color]
                            stickers[item.title].size = [item.size]
                          }
                          else{
                            stickers[item.title].color = []
                            stickers[item.title].size = []
                          }
                  }
      }
  
    return {
      props : {products: JSON.parse(JSON.stringify(stickers))},
    }
  }

export default Stickers



// https://rukminim1.flixcart.com/image/416/416/kltryq80/wallpaper/b/2/g/600-45-wp-503-kaaf-original-imagyv4jmrg7anf4.jpeg?q=70
// https://rukminim1.flixcart.com/image/416/416/k0wqwsw0/sticker/9/2/y/chinese-lamps-in-red-double-sheet-6980-extra-large-175-6980-original-imafkhkegsyuzscn.jpeg?q=70
// https://rukminim1.flixcart.com/image/416/416/kekadu80/sticker/z/z/k/wall-decals-pink-tree-with-birds-and-nest-wall-stickers-pvc-original-imafv826gpzauzjr.jpeg?q=70
// https://rukminim1.flixcart.com/image/416/416/l3es13k0/sticker/o/j/z/medium-black-3d-butterflies-13-hdb24-sb-flipkart-smartbuy-original-imagdzcfyq56qhtc.jpeg?q=70
// https://rukminim1.flixcart.com/image/416/416/xif0q/sticker/o/o/c/medium-black-flower-and-pink-butterfly-wall-sticker-size-original-imagm2jfkzadgtzc.jpeg?q=70
// https://rukminim1.flixcart.com/image/416/416/jwmfcsw0/sticker/z/m/z/wall-decals-hanging-lamps-wall-stickers-pvc-vinyl-multicolour-original-imafh9vhggkbjnn7.jpeg?q=70
// https://rukminim1.flixcart.com/image/416/416/ktuewsw0/sticker/u/n/i/medium-kitchen-wall-sticker-3018-jaamsoroyals-original-imag73sm58vdrmvu.jpeg?q=70


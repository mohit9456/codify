import React from 'react'
import Head from 'next/head'

const About = () => {
  return (
    <div>
      <Head>
        <title>About us - codify.com</title>
        <meta name="description" content="codify.com- wear the code " />
        
      </Head>
      <section className="text-gray-600 body-font overflow-hidden min-h-screen">
  <div className="container px-5 py-24 mx-auto">
    <div className="lg:w-4/5 mx-auto flex flex-wrap">
      <div className="lg:w-3/4 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
        <h1 className="text-gray-900 text-3xl title-font font-bold underline mb-4">About Codify</h1>
        <div className='my-5 font-medium'>
          <div>codify.com is revolutionizing the way India shops for unique, geeky apparel. From our one-of-a-kind hoodie designs to our wide selection of stickers, mugs and other accessories, we have everything you need to express your individuality and stand out from the crowd. Say goodbye to the hassle of hopping from store to store in search of your perfect geeky look. With just a single click on our website, you can find it all!</div><br />
          <div>But what sets Codify apart from the competition? The answer is simple: our unique designs and commitment to providing the highest quality products. We understand the importance of style and durability, which is why we put so much effort into creating unique designs and using only the best materials. Do not settle for mediocre clothing and accessories - choose codify and make a statement with your wardrobe.</div><br />
          <div>At Codify, we strive to be more than just an online store - we want to be a community where like-minded individuals can come together and express themselves through fashion. Whether you are a gamer, a programmer, or simply someone who loves all things geeky, we have something for you. Our collection is curated with the latest trends and fan favorites in mind, ensuring that you will always find something new and exciting.</div><br />
          <div>We also understand the importance of affordability and convenience. That why we offer competitive prices and fast shipping, so you can get your hands on your new geeky apparel as soon as possible. Plus, with our easy-to-use website and secure checkout process, shopping with us is a breeze.</div><br />
          <div>So why wait? Visit us today and discover the latest in geeky fashion. With our unique designs and high-quality products, we are sure you will find something you will love. Join our community and express your individuality through fashion.</div><br />
        </div>
      </div>
      <img alt="ecommerce" className="lg:w-1/4 w-full md:h-96 lg:h-96 h-64 object-cover object-center rounded lg:mt-36 " src="https://www.codeswear.com/order.jpg" />
    </div>
  </div>
</section>
    </div>
  )
}

export default About

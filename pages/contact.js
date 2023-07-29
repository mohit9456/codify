import React from 'react'
import Head from 'next/head'

const Contact = () => {
  return (
    <div>
      <Head>
        <title>Feel free to contact us - codify.com</title>
        <meta name="description" content="codify.com- wear the code " />
        
      </Head>
      <section className="text-gray-600 body-font relative min-h-screen">
  <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
    <div className="lg:w-2/3 md:w-1/2 bg-gray-300 mx-auto rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
      <iframe width="100%" height="100%" className="absolute inset-0" frameborder="0" title="map" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%&height=600&hl=en&q=%C4%mumbai+(My%20Business%20Name)&ie=UTF8&t=&z=14&iwloc=B&output=embed"></iframe>
      <div className="bg-white relative flex flex-wrap p-6 rounded shadow-md lg:w-1/2 ">
          <h2 className="title-font font-semibold text-gray-900 tracking-widest">ADDRESS</h2>
          <p className="mt-1 mx-auto font-semibold text-black ">Manoranjan Studio, Mehta Industrial Estate, Rd, Near WEH Metro Station, 400047, Amrut Nagar Rd, Chakala, Andheri East, Mumbai, Maharashtra 400064</p>
      </div>
    </div>
    <div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full mt-8 md:mt-0 md:py-32">
      <h2 className="text-black text-3xl mb-1 font-extrabold title-font">Feel Free to Ask us Anything</h2>
      <div className='mt-4'>
        <div className='font-semibold text-2xl mb-4 underline'>Customer Support</div>
        <div className='m-2 text-black  '><span className='font-semibold'>Email :</span> wearthecode@gmail.com</div>
        <div className='m-2 text-black  '><span className='font-semibold'>Contact us :</span> 7451066362</div>
        <div className='m-2 text-black '><span className='font-semibold'>Timing :</span> 8 A.M. to 6 P.M.</div>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default Contact
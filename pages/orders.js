import { React , useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link';
import Head from 'next/head'


const Orders = () => {

    const router = useRouter();
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const fetchOrders = async () => {
            let a = await fetch(
                `${process.env.NEXT_PUBLIC_HOST}/api/myorders`,
                {
                  method: "POST",
                  body: JSON.stringify({token: JSON.parse(localStorage.getItem('myuser')).token}),
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
              const res = await a.json();
              setOrders(res.orders);
        }
        if(!localStorage.getItem("myuser")){
            alert("Please login to continue !")
            router.push('/login')
        }else{
            fetchOrders()
        }
        
      
      }, [])
      

    return (
        <div className='min-h-screen'>
        <Head>
        <title>see all the orders in codify.com</title>
        <meta name="description" content="codify.com- wear the code " />
        
        </Head>
        {/* {Object.keys(setOrders).length === 0 && <h1 className='text-center mt-20 text-7xl font-extrabold'>You have not shopping yet</h1>} */}
        
           <div className="container mx-auto">
                <h1 className="font-semibold text-center text-3xl p-8">My Orders</h1>
                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full text-left text-sm font-light">
                                    <thead className="border-b font-medium dark:border-neutral-500">
                                        <tr>
                                            <th scope="col" className="px-6 py-4">#Order Id</th>
                                            <th scope="col" className="px-6 py-4">Email</th>
                                            <th scope="col" className="px-6 py-4">Amount</th>
                                            <th scope="col" className="px-6 py-4">Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { orders.map((item) => {
                                        return(
                                        <tr key={item._id}
                                            className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                            <td className="whitespace-nowrap px-6 py-4 font-medium">{item.orderId}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{item.email}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{item.amount}</td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <Link href={'/order?id=' + item._id}> <a>Details</a> </Link>
                                            </td>
                                        </tr>)
                                        })}
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Orders

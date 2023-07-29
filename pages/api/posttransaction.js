import Order from "../../models/order";
import connectDb from "../../middleware/mongoose";
import Product from "../../models/product";

const handler = async (req, res) => {


  // updae status into orders table after checking the transaction status
  let order = await Order.findOneAndUpdate({orderId: req.body.razorpay_order_id}, {status: 'Paid', paymentInfo: JSON.stringify(req.body), transactionId: req.body.razorpay_payment_id})
  let products = order.products; 

  for(let slug in products){
    await Product.findOneAndUpdate({slug: slug}, {$inc: {"availableQty": - products[slug].qty }})
  }

  //initiate shipping


  //redirect user to order confirmation page
  res.redirect('/order?clearCart=1&id='+order._id, 200);


    // res.status(200).json({ body: req.body })
  }
  
  export default connectDb(handler);
  
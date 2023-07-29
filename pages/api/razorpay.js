import Razorpay from "razorpay";
import shortid from "shortid";
import Order from "../../models/order";
import Product from "../../models/product";
import connectDb from "../../middleware/mongoose";
import pincodes from '../../pincodes.json'

const handler = async (req, res) => {


  //check the pincode is servicable or not-------
  if(!Object.keys(pincodes).includes(req.body.pincode)){
    res.status(400).json({"success": false, "error": "Sorry ! we are not servicable in your city yet !", cartClear: false})
    return
  }

  let product, sumTotal = 0;
  let cart = req.body.cart;

  // check if your cart is empty--------
  if(req.body.subTotal <= 0){
    res.status(400).json({"success": false, "error": "Cart Empty ! please add items in your cart !", cartClear: false})
    return
  }
    for(let item in cart){
      sumTotal += cart[item].price *  cart[item].qty
      product = await Product.findOne({slug: item})

      //check if the items are out of stock---------
      if(product.availableQty < cart[item].qty){
        res.status(400).json({"success": false, "error": "Some items in your cart are out of stock. Please try again !", cartClear: true})
        return
      }
      // check if tamopring on cart in localstorage by clent side-----------
      if(product.price != cart[item].price){
        res.status(400).json({"success": false, "error": "Price of items in your cart have been changed. Please try again !", cartClear: true})
        return
      }
    }

    if(sumTotal != req.body.subTotal){
      res.status(400).json({"success": false, "error": "Price of items in your cart have been changed. Please try again !", cartClear: true})
        return
    }

    //validate the phone number---------
    if(req.body.phone.length !== 10 || !Number.isInteger(Number(req.body.phone))){
      res.status(400).json({"success": false, "error": "Please Enter 10 Digit Phone Number !", cartClear: false})
      return
    }


    //validate the pincode--------
    if(req.body.pincode.length !== 6 || !Number.isInteger(Number(req.body.pincode))){
      res.status(400).json({"success": false, "error": "Please Enter validate pincode !", cartClear: false})
      return
    }
    

    var instance = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    var options = {
      amount: (req.body.subTotal) * 100, // amount in the smallest currency unit
      currency: "INR",
      receipt: shortid.generate(),
    };
    instance.orders.create(options, async function (err, order) {
      if (err) {
        return await res.json({ success: false, error: err });
      }
      await res.json({ success: true, id: order.id, amount: order.amount });

      let orders1 = new Order({
        email: req.body.email,
        name: req.body.name,
        orderId: order.id,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        pincode: req.body.pincode,
        phone: req.body.phone,
        amount: req.body.subTotal,
        products: req.body.cart,
      })
  
      await orders1.save();
     
    });
    
  }





export default connectDb(handler);
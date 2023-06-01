import Order from "../models/order.model.js"
import Gig from "../models/gig.model.js"

import Stripe from "stripe"

const intent = async (req, res, next) => {

   const stripe = new Stripe(
      process.env.STRIPE
   )

   const gig = await Gig.findById(req.params.id)

   try {
      // Create a PaymentIntent with the order amount and currency
      const paymentIntent = await stripe.paymentIntents.create({
         amount: (gig.price * 100),
         currency: "inr",
         automatic_payment_methods: {
            enabled: true,
         },
      });

      const newOrder = new Order({
         gigId: gig._id,
         img: gig.cover,
         title: gig.title,
         price: gig.price,
         sellerId: gig.userId,
         buyerId: req.userId,
         isCompleted: false,
         payment_intent: paymentIntent.id,
      })

      await newOrder.save()

      res.status(200).send({
         clientSecret: paymentIntent.client_secret,
      });
   } catch (error) {
      next(error)
   }
};

const getOrder = async (req, res, next) => {
   try {
      const orders = await Order.find({
         ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
         isCompleted: true,
      })
      // console.log(orders)
      res.status(200).send(orders)
   } catch (error) {
      next(error)
   }
}

const confirm = async (req, res, next) => {

   try {
      const orders = await Order.findOneAndUpdate({ payment_intent: req.body.payment_intent, }, {
         $set: {
            isCompleted: true
         },
      })

      res.status(200).send("Order has been confirmed.")

   } catch (error) {
      next(error)
   }
}

// const createOrder = async (req, res, next) => {
//    try {
//       const gig = await Gig.findById(req.params.gigId)

//       const newOrder = new Order({
//          gigId: gig._id,
//          img: gig.cover,
//          title: gig.title,
//          price: gig.price,
//          sellerId: gig.userId,
//          buyerId: req.userId,
//          isCompleted: false,
//          payment_intent: "temporary"

//       })

//       await newOrder.save()
//       res.status(201).send("successful")
//    } catch (error) {
//       next(error)
//    }
// }


export { getOrder, intent, confirm }
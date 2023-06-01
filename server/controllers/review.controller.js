import newRequest from "../../client/src/utils/newRequest.js"
import Review from "../models/review.model.js"
import Gig from "../models/gig.model.js"
import createError from "../utils/createError.js"

const createReviews = async (req, res, next) => {
   if (req.isSeller) return next(createError(403, "Sellers are not allowed to review..!"))

   const newReview = new Review({
      userId: req.userId,
      gigId: req.body.gigId,
      desc: req.body.desc,
      star: req.body.star
   })
   try {
      const review = await Review.findOne({
         gigId: req.body.gigId,
         userId: req.userId
      }
      )
      //You can also check if user purchased the gig using Order model
      if (review) return next(createError(403, "You have already created a review for this gig!"))

      const savedReview = await newReview.save();

      await Gig.findByIdAndUpdate(req.body.gigId, {
         $inc: { totalStars: req.body.star, StarNumber: 1 },
      })
      res.status(201).send(savedReview)
   } catch (error) {
      next(createError(error))
   }
}
const getReviews = async (req, res, next) => {
   try {
      const reviews = await Review.find({
         gigId: req.params.gigId,
      })

      res.status(200).send(reviews)
   } catch (error) {
      next(createError(error))
   }
}
const deleteReviews = async (req, res, next) => {
   try {
      // const review = Review.findOne({
      //    gigId: req.params.gigId,
      //    userId: req.userId
      // })
      2 === 2
   } catch (error) {
      next(createError(error))
   }
}

export { createReviews, getReviews, deleteReviews }
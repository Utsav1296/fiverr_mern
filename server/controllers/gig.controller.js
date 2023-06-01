import gigModel from "../models/gig.model.js"
import Gig from "../models/gig.model.js"
import createError from "../utils/createError.js"

const createGig = async (req, res, next) => {
   if (!req.isSeller) return next(createError(403, "Only sellers can create a Gig..."))

   // taking userId from JWT
   const newGig = new Gig({
      ...req.body,
      userId: req.userId,
   })
   try {
      const savedGig = await newGig.save()
      res.status(201).json(savedGig)

   } catch (error) {
      next(error)
   }
}

const deleteGig = async (req, res, next) => {
   try {
      const gig = await Gig.findById(req.params.id)

      if (gig.userId != req.userId) return next(createError(403, "You can delete only your Gig..."))

      await Gig.findByIdAndDelete(req.params.id)
      return res.status(200).send("Gig has been deleted..!")

   } catch (error) {
      next(error)
   }
}

const getGig = async (req, res, next) => {
   try {
      const gig = await Gig.findById(req.params.id)
      if (!gig) return next(createError(404, "Gig not found..."))

      return res.status(200).json(gig)
   } catch (error) {
      next(error)
   }
}

const getGigs = async (req, res, next) => {
   const q = req.query;
   // console.log("🚀 ~ file: gig.controller.js:49 ~ getGigs ~ q:", Object.keys(q).length)

   const filters = {
      ...(q.userId && { userId: q.userId }),
      ...(q.cat && { category: { $regex: q.cat, $options: "i" } }),
      ...((q.min || q.max) && { price: { ...(q.min && { $gt: q.min }), ...(q.max && { $lt: q.max }) } }),
      ...(q.search && { title: { $regex: q.search, $options: "i" } }),
   }
   try {
      const gigs = await Gig.find(filters).sort({ [q.sort]: - 1 })
      return res.status(200).json(gigs)
   } catch (error) {
      next(error)
   }
}

export { createGig, deleteGig, getGig, getGigs };
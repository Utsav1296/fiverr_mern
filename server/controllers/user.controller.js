import User from "../models/user.model.js"
import createError from "../utils/createError.js"
// import jwt from "jsonwebtoken";


const deleteUser = async (req, res, next) => {

   const user = await User.findById(req.params.id)

   if (req.userId !== user?._id.toString()) {
      return next(createError(403, "You can delete only your account!"))
   }
   // res.send('deleted')
   await User.findByIdAndDelete(req.params.id)
   res.status(200).json({ "message": "deleted" })
}

const getUser = async (req, res, next) => {
   const user = await User.findById(req.params.id)

   if (!user) {
      return next(createError(404, "No user found with this userId"))
   }

   res.status(200).send(user)
}

export { deleteUser, getUser }
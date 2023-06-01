import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";


const register = async (req, res, next) => {
   try {
      // Store hash in your password DB.
      const saltRounds = 5
      const hash = bcrypt.hashSync(req.body.password, saltRounds);

      const newUser = new User({
         ...req.body,
         password: hash,
      })

      await newUser.save();
      res.status(201).json({ message: "user has been created" })
   } catch (err) {
      next(err);
   }
}

const login = async (req, res, next) => {
   try {
      const user = await User.findOne({ username: req.body.username });

      // const err = new Error();
      // err.message = "User not found"
      // err.status = 404
      if (!user) return next(createError(404, "User not found..!"))

      const isCorrect = bcrypt.compareSync(req.body.password, user.password);
      if (!isCorrect) return next(createError(400, "Username or password is incorrect..."))

      const token = jwt.sign({
         id: user._id,
         isSeller: user.isSeller,
      }, process.env.JWT_KEY)

      const { password, ...info } = user._doc
      res.cookie("accessToken", token, {
         httpOnly: true,
      }).status(200).send(info)
   } catch (err) {
      next(err)
   }
}

// for advance logout, we can use a blacklist array or can store loggedOut tokens or can use Redis 
const logout = async (req, res) => {
   try {
      //sameSite:none because to reach our cookies ,we have to leave the site,as our client and server is on different site.
      res.clearCookie("accessToken", {
         sameSite: "none",
         secure: true,
      }).status(200).send("User has been logged out")
   } catch (error) {
      next(error)
   }
}

export { register, login, logout }
import createError from "../utils/createError.js";
import Conversation from "../models/conversation.model.js"

// {
//"id": "abc123",
//"sellerId": "seller1",
//"buyerId": "buyer1",
//"readBySeller": true,
//"readByBuyer": false,
//"lastMessage": "Hello, how are you?"
// }


const getConversations = async (req, res, next) => {
   try {
      const conversations = await Conversation.find(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }).sort({ updatedAt: -1 })
      res.status(200).send(conversations)

   } catch (err) {
      next(err)
   }
}

const getSingleConversation = async (req, res, next) => {
   try {
      const conversation = await Conversation.findOne({ id: req.params.id })
      if (!conversation) return next(createError(404, "No conversations found ..!"))

      res.status(200).send(conversation)
   } catch (err) {
      next(err)
   }
}

const postConversations = async (req, res, next) => {
   const newConversation = new Conversation({
      id: req.isSeller ? req.userId + req.body.to : req.body.to + req.userId,
      sellerId: req.isSeller ? req.userId : req.body.to,
      buyerId: req.isSeller ? req.body.to : req.userId,
      readBySeller: req.isSeller,
      readByBuyer: !req.isSeller,
   })

   try {
      const savedConversation = await newConversation.save();
      return res.status(201).send(savedConversation);
   } catch (err) {
      next(err)
   }
}
const updateConversations = async (req, res, next) => {
   const updateConversation = await Conversation.findOneAndUpdate({ id: req.params.id }, {
      $set: {
         // readBySeller: true,
         // readByBuyer: true,
         ...(req.isSeller ? { readBySeller: true } : { readByBuyer: true }),
      }
   },
      { new: true },
   );

   try {
      res.status(200).send(updateConversation)
   } catch (err) {
      next(err)
   }
}

export { postConversations, updateConversations, getConversations, getSingleConversation }
import mongoose from 'mongoose';
const { Schema } = mongoose;

const ReviewSchema = new Schema({
   gigId: {
      type: String,
      required: true,
      unique: true,
   },
   userId: {
      type: String,
      required: true,
      unique: false,
   },
   star: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4, 5]
   },
   desc: {
      type: String,
      required: true,
   },
},
   {
      timestamps: true,
   },
);

export default mongoose.model('Review', ReviewSchema);
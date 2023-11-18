import mongoose from "mongoose";
const currentDate = new Date();
const curr_date= currentDate.toLocaleTimeString();

type Message ={
    MagazineTitle:string;
    description:string;
    File_Location:String;
    YouTube_Url:String;
    createdAt: String;
    updatedAt: String;
  }

const messageSchema = new mongoose.Schema({
    title: String,
    description: String,
    File_Location: String,
    YouTube_Url: String,
    createdAt: {
        type: String,
       default:new Date()+ curr_date,
      },
      updatedAt: {
        type: String,
      },
    });
    messageSchema.pre("save", function (this: Message & mongoose.Document, next) {
      this.updatedAt = new Date() + curr_date;
      next();
    });


const Message = mongoose.model("message",messageSchema)
export default Message;
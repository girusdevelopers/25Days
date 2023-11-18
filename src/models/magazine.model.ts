import mongoose,{model,Schema} from "mongoose";

const currentDate = new Date();
const curr_date= currentDate.toLocaleTimeString();

type Magazine ={
  MagazineTitle:string;
  description:string;
  File_Location:String;
  download_file:String
  createdAt: String;
  updatedAt: String;
}

// Create a Mongoose schema for the Article type
const magazine = new mongoose.Schema<Magazine>({
  MagazineTitle: String,
  description: String,
  File_Location:String,
  download_file:String,
  createdAt: {
    type: String,
   default: curr_date,
  },
  updatedAt: {
    type: String,
  },
});
magazine.pre("save", function (this: Magazine & mongoose.Document, next) {
  this.updatedAt = new Date() + curr_date;
  next();
});

// Create a Mongoose model for the Article type
const Magazine = mongoose.model("Magazine", magazine);

export default Magazine;

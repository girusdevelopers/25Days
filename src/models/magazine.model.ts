import mongoose,{model,Schema} from "mongoose";

type Magazine ={
  MagazineTitle:string;
  description:string;
  File_Location:String
}

// Create a Mongoose schema for the Article type
const magazine = new mongoose.Schema<Magazine>({
  MagazineTitle: String,
  description: String,
  File_Location:String
});

// Create a Mongoose model for the Article type
const Magazine = mongoose.model("Magazine", magazine);

export default Magazine;
 

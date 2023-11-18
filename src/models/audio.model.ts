
import mongoose from "mongoose";




const songSchema = new mongoose.Schema({
 
  title:String,
  artist:String,
  lyrics:String,
  File_Location:String,
  download_file:String
});

const Audio = mongoose.model('audio', songSchema); // 'Song' is the model name
export default Audio;
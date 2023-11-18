import Audio from "@/models/audio.model"

import { s3Uploadv3 } from "@/utils/s3service";
import { BASE_URL } from "@/config";
import Banner from "@/models/banner.model";


// app.use(multer().array("song")); 

export const bannerupload = async (req, res) => {
    try {
      const results = await s3Uploadv3(req.files as Express.Multer.File[]);

    // console.log(results);
    const file_location=results.key;
    const banner = await Banner.create({
      
    Banner_location:`${BASE_URL}/v1/readstream/${file_location}`,
    });

     
      return res.status(200).json(banner);
    } catch (error) {
      return res.status(400).json({ error: "Details not uploaded." });
    }
  };


export const allbanners =async (req , res) => {
    try {
        const banners= await Banner.find({});

        res.status(200).json(banners)
    }catch(error){
        res.status(400).json("not found")
    }
}

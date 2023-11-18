import Audio from "@/models/audio.model"
import multer from "multer"; 
import { s3Uploadv3 } from "@/utils/s3service";
import { AWS_BUCKET_NAME, BASE_URL } from "@/config";
import app from "@/app";
import location from "aws-sdk/clients/location";

// app.use(multer().array("song")); 

export const success = async (req, res) => {
    const { title, artist, description, lyrics} = req.body;
    try {
      const results = await s3Uploadv3(req.files as Express.Multer.File[]);

    // console.log(results);
    const file_location=results.key;
    const download= results.location;
    const audio = await Audio.create({
      title,
      artist,
      lyrics,
      File_Location:`${BASE_URL}/v1/readstream/${file_location}`,
      download_file: download
    });

      // const audio = Audio.create({
      //   title,
      //   artist,
      //   description,
      //   lyrics,
      //   });
      // (await audio).save();
      return res.status(200).json(audio);
    } catch (error) {
      return res.status(400).json({ error: "Details not uploaded." });
    }
  };


  export const updateAudioDetails = async (req, res) => {
    const { title, artist, description, lyrics } = req.body;
    const audioId = req.params.id; // Assuming you pass the audio ID in the route URL
  
    try {
      const audio = await Audio.findByIdAndUpdate({_id: audioId},{$set:{title,description,artist,lyrics}, new:true})
  
      if (!audio) {
        return res.status(404).json({ error: "Audio not found" });
      }
      await audio.save();
      return res.status(200).json("Details updated successfully");
    } catch (error) {
      return res.status(400).json({ error: "Details not updated." });
    }
  };


  export const getAudioDetails = async (req, res) => {
    try {
      const audioDetails = await Audio.find(); // Retrieve all audio details from the database
      res.status(200).json(audioDetails);
    } catch (error) {
      res.status(500).json({ error: "Error retrieving audio details." });
    }
  };


  export const deleteAudioDetails = async (req, res) => {
    try {
      const {id} = req.params;
      const audio = await Audio.deleteOne({_id: id});
      return res.status(200).json("Details deleted successfully");
    } catch (error) {
      return res.status(500).json({ error: "Error deleting audio details" });
    }
  };


  export const getAudioById = async (req, res) => {
    try {
      const { id } = req.params;
      const audio = await Audio.findById(id);
  
      if (!audio) {
        return res.status(404).json({ error: "Audio not found" });
      }
  
      res.status(200).json(audio);
    } catch (error) {
      return res.status(500).json({ error: "Error retrieving audio details" });
    }
  };
  
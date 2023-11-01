import Message from "@/models/message.model";

export const uploade = async(req,res)=>{
    try{
        const {title,description,url } = req.body;

        if(!title || !description||!url){
            return res.status(400).json({msg:"Please fill all fields"})
        }
       
        const message = await Message.create({
            title:title,
            description:description,
            url:url
        })
        message.save();
        res.status(200).json(message)

    }catch(error){
        res.status(500).json("error")
    }
}
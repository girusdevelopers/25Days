import Message from "@/models/message.model";

export const upload = async(req,res)=>{
    try{
        const {title,description,url } = req.body;

        if(!title || !description||!url){
            return res.status(400).json({msg:"Please fill all fields"})
        }
       
        const message = await Message.create({
            title:title,
            description:description,
            YouTube_Url:url
        })
        res.status(200).json(message)
    }catch(error){
        res.status(500).json("error")
    }
}


export const getall = async(req,res) =>{
    try{
        const messages=  await Message.find();
        res.status(200).json(messages)
    }catch(error){
        res.status(500).json("error")
    }

}

export const UpdateMessage = async(req,res) => {
    try{
        const {id} = req.params;
        const {title,description,url } = req.body;
        const message = await Message.findByIdAndUpdate({_id: id},{$set:{title,description,url}, new:true})
        await message.save();
        res.status(200).json(message);
    }catch(error){
        res.status(500).json("error")
    }
}

export const findbytitle =async (req,res) => {
    try{
        const {title}=req.params;
        console.log(title)
        const message =await Message.find({title});
        res.status(200).json(message);
    }catch(error){
        res.status(500).json("error")
    }
}

export const deletebyId = async(req,res) => {
    try{
        const {id} = req.params;
        const message = await Message.deleteOne({_id: id});
        res.status(200).json("Message deleted successfully");
    }catch(error){
        res.status(500).json("error")
    }
}

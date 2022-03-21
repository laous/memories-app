import Memorie from "../../../models/Memorie"
import dbConnect from "../../../util/dbConnect"

export default async function handler(req, res) {
    const {method} = req
    const {id} = req.query
    
    await dbConnect()

    switch (method) {
        case "GET":
            try{
                const memorie =  await Memorie.findById(id)
                res.status(201).json(memorie)
            }catch(err){
                res.status(500).json(err);
            }
            break;
        case "POST":
            try{
                const memorie =  await Memorie.find({_id: id})
                if(!memorie) {
                    res.status(400)
                    throw new Error("Memorie not found")
                }
            
                // if(!req.user){
                // res.status(400)
                // throw new Error("User not found")
                // }
            
                // make sure its the same user 
                // if(goal.user.toString() !== req.user.id){
                //     res.status(400)
                //     throw new Error("User not authorized")
                // }

                // (id , new updates , create new one if not found)
                const updatedMemorie = await Memorie.findByIdAndUpdate(id, req.body, {new:true})

                res.status(200).json(updatedMemorie)

            }catch(err){
                res.status(500).json(err);
            }
            break;
        case "DELETE":
            try{
                const memorie =  await Memorie.find({_id: id})
                if(!memorie) {
                    res.status(400)
                    throw new Error("Memorie not found")
                }
            
                // if(!req.user){
                // res.status(400)
                // throw new Error("User not found")
                // }
            
                // make sure its the same user 
                // if(goal.user.toString() !== req.user.id){
                //     res.status(400)
                //     throw new Error("User not authorized")
                // }

                // (id , new updates , create new one if not found)
                const updatedMemorie = await Memorie.findByIdAndDelete(id, req.body, {new:true})

                res.status(200).json(updatedMemorie)

            }catch(err){
                res.status(500).json(err);
            }
            break;

    
        default:
            break;
    }
}
import User from "../../../models/User"
import dbConnect from "../../../util/dbConnect"

export default async function handler(req, res) {
    const {method} = req
    const {id} = req.query
    
    await dbConnect()

    switch (method) {
        case "GET":
            try{
                const user =  await User.findById(id)
                res.status(201).json(user)
            }catch(err){
                res.status(500).json(err);
            }
            break;
        case "POST":
            try{
                const user =  await User.find({_id: id})
                if(!user) {
                    res.status(400)
                    throw new Error("User not found")
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
                const updatedUser = await User.findByIdAndUpdate(id, req.body, {new:true})

                res.status(200).json(updatedUser)

            }catch(err){
                res.status(500).json(err);
            }
            break;
        case "DELETE":
            try{
                const user =  await User.find({_id: id})
                if(!user) {
                    res.status(400)
                    throw new Error("User not found")
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
                const updatedUser = await User.findByIdAndDelete(id, req.body, {new:true})

                res.status(200).json(updatedUser)

            }catch(err){
                res.status(500).json(err);
            }
            break;

    
        default:
            break;
    }
}
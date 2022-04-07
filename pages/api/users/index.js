import User from "../../../models/User"
import dbConnect from "../../../util/dbConnect"
export default async function handler(req, res) {
    const {method} = req
    
    await dbConnect()

    switch (method) {
        case "GET":
            try{
                const users =  await User.find()
                res.status(202).json(users)
            }catch(err){
                res.status(500).json(err);
            }
            break;
        case "POST":
            try{
                const existingUser = await User.find({email:req.body.email})
                if(existingUser){
                    res.status(500)
                    throw new Error('User existing')
                }
                const user =  await User.create(req.body)
                res.status(201).json(user)
            }catch(err){
                res.status(500).json(err);
            }
            break;
    
        default:
            break;
    }
}
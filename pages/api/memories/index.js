import { getSession } from "next-auth/react"
import Memorie from "../../../models/Memorie"
import dbConnect from "../../../util/dbConnect"


export default async function handler(req, res) {
    const {method} = req

    const session = await getSession({ req })

    await dbConnect()

    switch (method) {
        case "GET":         
            try{
                const memories =  await Memorie.find()
                res.status(202).json(memories)
            }catch(err){
                res.status(500).json(err);
            }
            break;
        case "POST":
            if(!session){
                res.status(400)
                throw new Error("User not authenticated")
            }
            
            try{
                const memorie =  await Memorie.create({...req.body})
                if(memorie.username !==session.user.username || memorie.email !==session.user.email ){
                    res.status(400)
                    throw new Error("User not authorized")
                }
                res.status(201).json(memorie)
            }catch(err){
                res.status(500).json(err);
            }


            break;
    
        default:
            break;
    }
}
import { getSession } from "next-auth/react"
import Memorie from "../../../models/Memorie"
import dbConnect from "../../../util/dbConnect"

export default async function handler(req, res) {
    const {method} = req
    const {id} = req.query
    const session = await getSession({req})
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
            if(!session){
                res.status(400)
                throw new Error("User not authenticated")
            }
            try{
                const memorie =  await Memorie.find({_id: id})

                if(!memorie) {
                    res.status(400)
                    throw new Error("Memorie not found")
                }

                if(memorie.username !==session.user.username || memorie.email !==session.user.email ){
                    res.status(400)
                    throw new Error("User not authorized")
                }
                const updatedMemorie = await Memorie.findByIdAndUpdate(id, req.body, {new:true})

                res.status(200).json(updatedMemorie)

            }catch(err){
                res.status(500).json(err);
            }
            break;
        case "DELETE":
            if(!session){
                res.status(400)
                throw new Error("User not authenticated")
            }
            try{
                const memorie =  await Memorie.find({_id: id})
                const user = getUserFromLocalStorage()
                if(!memorie) {
                    res.status(400)
                    throw new Error("Memorie not found")
                }
                if(memorie.username !==session.user.username || memorie.email !==session.user.email ){
                    res.status(400)
                    throw new Error("User not authorized")
                }

                const updatedMemorie = await Memorie.findByIdAndDelete(id)

                res.status(200).json(updatedMemorie)

            }catch(err){
                res.status(500)
                throw new Error("Server error")
            }
            break;

    
        default:
            break;
    }
}
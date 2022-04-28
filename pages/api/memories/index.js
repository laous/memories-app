import { getToken } from "next-auth/jwt"
import { getSession } from "next-auth/react"
import Memorie from "../../../models/Memorie"
import dbConnect from "../../../util/dbConnect"


export default async function handler(req, res) {
    const {method} = req

    const session = await getSession({ req })

    // if using `NEXTAUTH_SECRET` env variable, we detect it, and you won't actually need to `secret`
    // const token = await getToken({ req })
    const token = await getToken({ req })
    

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

            const userEmail  = req.body.email

            if(userEmail !== token?.email){
                console.log("Token :",token)
                res.status(400)
                throw new Error("User not authorized")
            }
            
            try{
                const memorie =  await Memorie.create({...req.body})
                // if(memorie.email !==session.user.email ){
                //     res.status(400)
                //     throw new Error("User not authorized")
                // }
                res.status(201).json(memorie)
            }catch(err){
                res.status(500).json(err);
            }


            break;
    
        default:
            break;
    }
}
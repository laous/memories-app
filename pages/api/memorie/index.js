import Memorie from "../../../models/Memorie"
import dbConnect from "../../../util/dbConnect"
export default async function handler(req, res) {
    const {method} = req
    
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
            try{
                const memorie =  await Memorie.create(req.body)
                res.status(201).json(memorie)
            }catch(err){
                res.status(500).json(err);
            }
            break;
    
        default:
            break;
    }
}
import connectDb from "../../middleware/mongoose";
import User from "../../models/User";
import jwt from 'jsonwebtoken';
import CryptoJS from 'crypto-js'


const handler = async (req, res) => {
    if (req.method == 'POST') {
        let id = req.body.id;
        let tkn = req.body.tkn;
        
        try {
            let dbUser = await User.findOne({ _id: id })
            if(!dbUser){
                res.status(400).json({ error: "Invalid URL...." ,success: false})
                return
            }else{
                let secret = id + process.env.JWT_SECRET;
                let ktn = jwt.verify(tkn, secret);
                if(ktn){
                    await User.findOneAndUpdate({email: dbUser.email}, {password: CryptoJS.AES.encrypt(req.body.password, process.env.AES_SECRET).toString()})
                    res.status(200).json({ success: true })
                    return
                }else{
                    res.status(400).json({ error: "Invalid URL...." ,success: false})
                }
            }
        } catch (error) {
            res.status(400).json({ error: "Invalid URL or session out.... !! please try again", success: false })
        return
        }
    }
}

export default connectDb(handler);
  

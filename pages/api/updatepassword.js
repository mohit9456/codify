import User from "../../models/User";
import connectDb from "../../middleware/mongoose";
import jsonwebtoken from 'jsonwebtoken'
import CryptoJS from 'crypto-js'


const handler = async (req, res) => {
    if(req.method == 'POST'){
            let token = req.body.token;
            let user = jsonwebtoken.verify(token, process.env.JWT_SECRET)
            let dbUser = await User.findOne({email: user.email})
            const bytes  = CryptoJS.AES.decrypt(dbUser.password, process.env.AES_SECRET);
            let decryptedData = bytes.toString(CryptoJS.enc.Utf8);
            if(decryptedData == req.body.password  && req.body.npassword == req.body.cpassword){
                await User.findOneAndUpdate({email: user.email}, {password: CryptoJS.AES.encrypt(req.body.npassword, process.env.AES_SECRET).toString()})
                res.status(200).json({ success: true })
                return
        
        }
        res.status(400).json({ success: false })


        
    }
    else{
        res.status(400).json({ error:"error" })
    }   
}

export default connectDb(handler);
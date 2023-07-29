import connectDb from "../../middleware/mongoose";
import User from "../../models/User";
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer'

const handler = async (req, res) => {
    if (req.method == 'POST') {
        const email1 = req.body.email;
        try {
            let dbUser = await User.findOne({ email: email1 })
            if(!dbUser){
                res.status(400).json({ error: "User Doesn't exist....", success: false })
                return
            }
            let secret = dbUser._id + process.env.JWT_SECRET;
            let token = jwt.sign({ email: dbUser.email, id: dbUser._id }, secret, { expiresIn : "5m" } );
            let email = `${process.env.NEXT_PUBLIC_HOST}/forgot?id=${dbUser._id}&token=${token}`;
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'mohitpandey1287@gmail.com',
                  pass: `${process.env.EMAIL_PASSWORD}`
                }
              });
              
              let mailOptions = {
                from: 'codify',
                to: `${email1}`,
                subject: 'RESET PASSWORD',
                text: `We have sent to you an email in response to your request to reset your password on codify.com. 
To reset your password, please follow the link below:
${email}
Click here to reset your pasword.
We recommended that you keep your password secure and not share with anyone. If you feel your password has been compromised, you can change it by going to your My Account page and change your password.`
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log("Email has been sent successfully !");
                }
              });
            res.status(200).json({ success: true })
            return
        } catch (error) {
            res.status(400).json({ success: false })
        return
        }          
    }
}

export default connectDb(handler);

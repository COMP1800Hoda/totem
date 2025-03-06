import express from 'express';
import dotenv from 'dotenv';
import nodeMailer from 'nodemailer';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
dotenv.config();

//Nodemailer

const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    },
});

app.post('/reset-password', async(req, res) => {
    const {email} = req.body;
    // Check if email is valid
    if(!email){
        return res.status(400).json({message: "Email is required"});
    }

    const resetLink = `http://localhost:5176/editPassword?email=${encodeURIComponent(email)}`;
    //Set up email data
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Reset Password Request for Totem Children Storybook",
        text: `Click on the link to reset your password ${resetLink}. This link will redirect you to the reset password page.`,
    };

    try{
        await transporter.sendMail(mailOptions);
        res.status(200).json({message: "Email sent successfully"});
        console.log("Email sent successfully");
    } catch(error){
        console.log(error);
        return res.status(500).json({message: "Error sending email"});
    }
})
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
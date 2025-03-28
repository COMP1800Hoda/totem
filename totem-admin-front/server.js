import express from 'express';
import dotenv from 'dotenv';
import nodeMailer from 'nodemailer';
import bodyParser from 'body-parser';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import ParseConfig from './parseConfig.js'
import jwt from 'jsonwebtoken';
import checkAuth from './src/middlewares/checkAuth.js';
const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

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

    const resetLink = `http://localhost:5188/edit-password?email=${encodeURIComponent(email)}`;
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

app.post('/', async(req,res) => {
    const {email, password} = req.body;
    try{
        const query = new ParseConfig.Query('Admin');
        query.equalTo('admin_email', email);
        const admin = await query.first();
        if(!admin){
            return res.status(401).json({message: "Email not found"});
        }
        const hashedPassword = admin.get('admin_hashed_password');
        const isMatch = await bcrypt.compare(password, hashedPassword);
        if(!isMatch){
            return res.status(401).json({message: 'Incorrect password'});
        }

        const token = jwt.sign({email: admin.get('admin_email')}, JWT_SECRET, {expiresIn: '60s'});
        res.json({token, message: 'Login successful'});
    } catch(error){
        console.log("error: ", error);
        res.status(500).json({message: "Internal server error"});
    }
})

 //only accessible if user is logged in
app.use ('/main', checkAuth, (req,res) => {
   
    res.json({message:'You are logged in and allow to access main page', user: req.user});
})

//done
app.use('/manage-books', checkAuth, (req,res) => {
    res.json({message:'You are logged in and allow to access manage-books page', user: req.user});
})


app.use ('/manage-admins', checkAuth, (req,res) => {
    res.json({message:'You are logged in and allow to access manage-admins page', user: req.user});
})

app.use ('/add-book', checkAuth, (req,res) => {
    res.json({message:'You are logged in and allow to access add-book page', user: req.user});
})

app.use ('/preview', checkAuth, (req,res) => {
    res.json({message:'You are logged in and allow to access preview page', user: req.user});
})


app.use ('/success', checkAuth, (req,res) => {
    res.json({message:'You are logged in and allow to access success page', user: req.user});
})


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


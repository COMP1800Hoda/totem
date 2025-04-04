import express from 'express';
import dotenv from 'dotenv';
import nodeMailer from 'nodemailer';
import bodyParser from 'body-parser';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import ParseConfig from './parseConfig.js'
import jwt from 'jsonwebtoken';
import checkAuth from './src/middlewares/checkAuth.js';
import sendResetEmail from './src/utils/sendResetEmail.js';
import path from 'path'; // Import the 'path' module

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;


app.post('/reset-password-request', async(req, res) => {
    const {email} = req.body;
    // Check if email is valid
    if(!email){
        return res.status(400).json({message: "Email is required"});
    }

    //The token store the email for later use
    // set epiration time to 5 minutes for the reset password link
    const token = jwt.sign({email: email}, JWT_SECRET, {expiresIn: '5m'});

    // HOSTED LINK
    // const resetLink = `https://totemchildrenstorybookadmin-1g9u4lon.b4a.run/edit-password?token=${token}}`;

    // change this based on the port your front end is running on if you test it locally
    // const resetLink = `http://localhost:5173/edit-password?token=${token}}`;

    const resetLink = `https://adminfinaldeployment-9gry1pfp.b4a.run/edit-password?token=${token}}`;
    console.log("reset link: ", resetLink);
    const emailResponse = await sendResetEmail(email, resetLink);

    if(emailResponse.success){
        console.log('Email sent successfully:', emailResponse.message);
        return res.status(200).json({message: "from server.js : Email sent successfully"});
    } else {
        console.log('Error sending email:', emailResponse.message);
        return res.status(500).json({message: "from server.js : Failed to send email"});
    }
})


app.post('/', async(req,res) => {
    console.log("Login route hit! Request body:", req.body);
    const {email, password} = req.body;
    try{
        const query = new ParseConfig.Query('Admin');
        query.equalTo('admin_email', email);
        const admin = await query.first();
        if(!admin){
            console.log("In server.js Email not found");
            return res.status(401).json({message: "Email not found"});
        }
        const hashedPassword = admin.get('admin_hashed_password');
        const isMatch = await bcrypt.compare(password, hashedPassword);
        if(!isMatch){
            return res.status(401).json({message: 'Incorrect password'});
        }  
        const adminRole = admin.get('admin_role');

        // change expiration time to any time you want for testing        
        const token = jwt.sign({email: email, adminRole: adminRole}, JWT_SECRET, {expiresIn: '1200000s'});
        res.json({token, message: 'Login successful'});
    } catch(error){
        console.log("error in logging route: ", error);
        res.status(500).json({message: "Internal server error"});
    }
})

 //only accessible if user is logged in
 //done
app.use ('/main', checkAuth, (req,res) => {
    res.json({message:'You are logged in and allow to access main page', user: req.user});
})

//done
app.use('/manage-books', checkAuth, (req,res) => {
    res.json({message:'You are logged in and allow to access manage-books page', user: req.user});
})

//done
app.use('/edit-book', checkAuth, (req,res) => {
    res.json({message:'You are logged in and allow to access edit-book page', user: req.user});
})

//done
app.use ('/manage-admins', checkAuth, (req,res) => {
    res.json({message:'You are logged in and allow to access manage-admins page', user: req.user});
})

//done
app.use ('/add-book', checkAuth, (req,res) => {
    res.json({message:'You are logged in and allow to access add-book page', user: req.user});
})

//done
app.use ('/preview', checkAuth, (req,res) => {
    res.json({message:'You are logged in and allow to access preview page', user: req.user});
})

//done
app.use ('/success', checkAuth, (req,res) => {
    res.json({message:'You are logged in and allow to access success page', user: req.user});
})

app.use('/change-password', checkAuth, (req,res) => {
    res.json({message:'You are logged in and allow to access change-password page', user: req.user});
})

// Serve static files from the 'dist' folder
const __dirname = path.resolve(); // Get the current directory
app.use(express.static(path.join(__dirname, 'dist')));

// Catch-all route to serve index.html for SPA navigation
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

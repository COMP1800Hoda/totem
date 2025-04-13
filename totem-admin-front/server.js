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

    const query = new ParseConfig.Query('Admin');
    query.equalTo('admin_email', email);
    const admin = await query.first();
    if(!admin){
        console.log('Email not found');
        return res.status(404).json({message: "Email not found"});
    }
    //The token store the email for later use
    // set epiration time to 5 minutes for the reset password link
    const token = jwt.sign({email: email}, JWT_SECRET, {expiresIn: '5m'});

    // change this based on the port your front end is running on if you test it locally
    // const resetLink = `http://localhost:5173/edit-password?token=${token}}`;

    const resetLink = `https://adminfinaldeployment-9gry1pfp.b4a.run/reset-password?token=${token}`;
    // const resetLink = `http://localhost:5173/reset-password?token=${token}`;
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
        const token = jwt.sign({email: email, adminRole: adminRole}, JWT_SECRET, {expiresIn: '15m'});
        res.json({token, message: 'Login successful'});
    } catch(error){
        console.log("error in logging route: ", error);
        res.status(500).json({message: "Internal server error"});
    }
})


app.post('/reset-password', checkAuth, async(req,res) => {
    const authHeader = req.headers['authorization'];;

    const password = req.body.newPassword;

    if(!authHeader || !authHeader.startsWith('Bearer') || !password){
        return res.status(400).json({message: "Both token and password are required"});
    }

    const token = authHeader.split(' ')[1]; // Remove Bearer from the token
    try{
        //decode the token to get the email
        const decoded= jwt.verify(token, JWT_SECRET);
        const email = decoded?.email;
        // if token is expired, so no email is found, return error message
        if(!email){
            return res.status(400).json({message: "Invalid or expired token"});
        }

        const query = new ParseConfig.Query('Admin');
        query.equalTo('admin_email', email);
        const admin = await query.first();
        if(!admin){
            console.log("In server.js Email not found");
            return res.status(401).json({message: "Email not found"});
        }
        //hash the new password before saving to the database
        const hashedPassword = await bcrypt.hash(password, 10);
        admin.set('admin_hashed_password', hashedPassword);
        await admin.save();
        console.log('Password updated successfully');
        res.status(200).json({message: 'Password updated successfully'});
    } catch(error){
        console.log("error in reset password route: ", error);
        res.status(500).json({message: "Internal server error"});
    }

});


 //only accessible if user is logged in
 //done
app.use ('/main', checkAuth, (req,res) => {
    res.json({message:'You are logged in and allow to access main page', user: req.user});
})

// Admin CRUD operations
app.get('/manage-admins', checkAuth, async (req, res) => {
    try {
        const query = new ParseConfig.Query('Admin');
        const results = await query.find();
        const admins = results.map(admin => ({
            id: admin.id,
            name: admin.get('admin_name'),
            role: admin.get('admin_role'),
            email: admin.get('admin_email')
        }));
        res.status(200).json(admins);
    } catch (error) {
        console.error('Error fetching admins:', error);
        res.status(500).json({message: 'Failed to fetch admins'});
    }
});

app.delete('/manage-admins/:id', checkAuth, async (req, res) => {
    try {
        const query = new ParseConfig.Query('Admin');
        const admin = await query.get(req.params.id);
        await admin.destroy();
        res.status(200).json({success: true});
    } catch (error) {
        console.error('Error deleting admin:', error);
        res.status(500).json({message: 'Failed to delete admin'});
    }
});

app.put('/manage-admins/', checkAuth, async(req,res) => {
    try {
          const query = new ParseConfig.Query('Admin');
          const editedAdmin = req.body;
          query.equalTo('admin_email', editedAdmin.email);
          const adminToUpdate = await query.first();
          adminToUpdate.set('admin_name',editedAdmin.name);
          adminToUpdate.set('admin_email', editedAdmin.email);
          adminToUpdate.set('admin_role', editedAdmin.role);
          await adminToUpdate.save();
          res.status(200).json({success: true});
        } catch (error) {
          console.log('Error updating admin: ', error);
          res.status(500).json({message: 'Failed to update admin'});
        }
})

app.post('/manage-admins', checkAuth, async(req,res) => {
    try{
        const newAdmin = req.body;
        const adminObj = new ParseConfig.Object('Admin');
        console.log("new admin: ", newAdmin.email);

        adminObj.set('admin_name', newAdmin.name);
        adminObj.set('admin_email', newAdmin.email);
        adminObj.set('admin_role', newAdmin.role);
        /**
        * get the unhashed password from the request body-> no need to hash password in the front end
        * just need to send the unhashed password to the server
        * and hash it here before saving to the database
        */
        const unhashedPassword = newAdmin.password;
        console.log("unhashed password: ", unhashedPassword);

        //Hash password before saving to the database
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(newAdmin.password, saltRounds);
        console.log('Hashed password:', hashedPassword);
        adminObj.set('admin_hashed_password', hashedPassword);
        await adminObj.save();
        res.status(200).json({success: true});
    } catch(error){
        console.error('Error creating admin:', error);
        res.status(500).json({message: 'Response from server. Failed to create admin'});
    }
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

/**
 * @description This file is used to send an email to the user when they forget their password.
 * It uses nodemailer to send the email.
 * It uses the email and password from the .env file to send reset password email.
 * 
 */
import nodeMailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

async function sendResetEmail(email, resetLink){

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Password Reset Request for Totem Children Storybook Admin',
        html: `
            <p>You requested a password reset.</p>
            <p>Click <a href="${resetLink}">here</a> to reset your password. This link will expire in 5 minutes</p>
            <p>If you did not request this, please ignore this email.</p>
        `,
    }
    try{
        await transporter.sendMail(mailOptions);
        console.log('Email sent to:', email);
        return { success: true, message: "Email sent successfully." };
    } catch(error){
        console.log('Error sending email:', error);
        return { success: false, message: "Error sending email" };
    }
}
export default sendResetEmail;
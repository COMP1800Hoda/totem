import { text } from 'express';

import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const sendResetEmail = async(email, resetLink) => {
    const msg = {
        to: email,
        from: 'no-replyTotemChildrenStorybook.com',
        subject: 'Password Reset Request',
        text: `Click on the link below to reset your password: ${resetLink}`,
        html: `<p>Click on the link below to reset your password: <a href="${resetLink}">${resetLink}</a></p>`
    };

    try {
        await sgMail.send(msg);
        console.log('Password reset email sent');
    } catch(error){
        console.error('Error sending password reset email:', error);
    }
}

export default sendResetEmail;
// import {Resend} from "resend";

// const resend  = new Resend(process.env.Resend_API_KEY);
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:465,
    secure:true,
    auth:{
        user:process.env.GMAIL_USER_KEY,
        pass:process.env.GMAIL_API_KEY
    }
});

export async function sendVerificationEmail(email,token){
    const verificationUrl = `${process.env.APP_BASE_URL}/verify-email?token=${encodeURIComponent(token)}`;
    const {data,error} = await transporter.sendMail({
        from: `"Ace"<${process.env.GMAIL_USER_KEY}>`,
        to: email,
        subject: 'Verify your email address',
        html:`
            <h2>verify your email address</h2>
            <p> Thanks for registering! </p>
            <p>
                <a href ="${verificationUrl}">Click here to verify your email address</a>
            </p>
            <p> This link will expire in 20 minutes.</p>

        `
    });
    if(error){
       throw new Error(`Error sending verification email: ${error.message}`);
    }
    return data;
}
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export default function sendEmail({ recepient_email, OTP }) {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.ADMIN_EMAIL,
                pass: process.env.EMAIL_PASSWD,
            },
        });

        const mail_configs = {
            from: process.env.ADMIN_EMAIL,
            to: recepient_email,
            subject: 'Gibberish Password Recovery...',
            html: `
                <!DOCTYPE html>
                <html lang="en" >
                <head>
                <meta charset="UTF-8">
                <title>Gibberish - Chat all you want</title>
                

                </head>
                <body>
                <!-- partial:index.partial.html -->
                <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                <div style="margin:50px auto;width:70%;padding:20px 0">
                    <div style="border-bottom:1px solid #eee">
                    <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Gibberish</a>
                    </div>
                    <p style="font-size:1.1em">Hi,</p>
                    <p>Thank you for choosing Gibberish.</p>
                    <p>Use the following OTP to complete your Password Recovery Procedure. OTP is valid for 5 minutes</p>
                    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
                    <p style="font-size:0.9em;">Regards,<br />Gibberish Team</p>
                    <hr style="border:none;border-top:1px solid #eee" />
                    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                    <p>Gibberish Inc</p>
                    <p>Engineering College Hostels</p>
                    <p>College of Engineering Guindy</p>
                    </div>
                </div>
                </div>
                <!-- partial -->
                
                </body>
                </html>`,       
        };

        transporter.sendMail(mail_configs, function (error,info) {
            if(error){
                console.log(error);
                return reject({message: "Failed to send E-mail"});
            }
            return resolve({messagr: "Email sent successfully!"});
        });
    });
}
import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(req: NextRequest) {
    try {
        const { subject, text } = await req.json();
  
        let transporter = nodemailer.createTransport({
          host: 'smtp-relay.brevo.com',
          port: 587,
          secure: false,
          auth: {
              user: '81da66002@smtp-brevo.com',
              pass: '' 
          },
        });
  
        // Define email options
        let mailOptions = {
          from: 'mail@divyansh.org',
          to: "mail@divyansh.org",
          subject,
          text,
        };
  
        // Send the email
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully: %s', info.messageId);
        return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
      } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
      }
}

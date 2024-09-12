import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'live.smtp.mailtrap.io',
  port: 587,
  auth: {
    user: 'api',
    pass: 'fe9e0d27b8a7963c57e4f7a7f7a3e060'
  }
});

export default transporter;
import nodemailer from 'nodemailer';
import { OUTLOOK_MAIL_USER, OUTLOOK_MAIL_PASSWORD } from '$env/static/private';

export function nodeMailer() {
    let transporter = nodemailer.createTransport({
        service: "Outlook365",
        auth: {
            user: OUTLOOK_MAIL_USER,
            pass: OUTLOOK_MAIL_PASSWORD,
        },        
    })
    return transporter;
}
import nodemailer from 'nodemailer';
import { MAIL_USER, MAIL_PASSWORD, MAIL_SERVICE } from '$env/static/private';

export function nodeMailer() {
    let transporter = nodemailer.createTransport({
        service: MAIL_SERVICE,
        auth: {
            user: MAIL_USER,
            pass: MAIL_PASSWORD,
        },        
    })
    return transporter;
}
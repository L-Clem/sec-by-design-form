import { error } from '@sveltejs/kit';
import { RateLimiter } from 'sveltekit-rate-limiter/server';
import { nodeMailer } from '$lib/server/nodeMailer';
import { sanitizeMail } from '$lib/server/sanitizer';
import { MAIL_USER } from '$env/static/private';

const limiter = new RateLimiter({
    IP: [5, 'h']
})

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
    if (await limiter.isLimited(event)) throw error(429);
};

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData()
        const recipient = formData.get("recipient") ? sanitizeMail(String(formData.get("recipient"))) : MAIL_USER
        const email = sanitizeMail(String(formData.get("email")))
        const message = sanitizeMail(String(formData.get("message")))

        let mailer = nodeMailer();

        const options = {
            from: MAIL_USER,
            to: recipient,
            subject: 'Contact by ' + email,
            html: '<!DOCTYPE html> <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en"> <head> <title></title> <meta http-equiv="Content-Type" content="text/html;charset=utf-8"> <meta name="viewport" content="width=device-width,initial-scale=1"> <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]--> <style> * {box-sizing: border-box }body {margin: 0;padding: 0 }a[x-apple-data-detectors] {color: inherit !important;text-decoration: inherit !important }#MessageViewBody a {color: inherit;text-decoration: none }p {line-height: inherit }.desktop_hide, .desktop_hide table {mso-hide: all;display: none;max-height: 0;overflow: hidden }.image_block img+div {display: none }@media (max-width:620px) {.mobile_hide {display: none }.row-content {width: 100% !important }.stack .column {width: 100%;display: block }.mobile_hide {min-height: 0;max-height: 0;max-width: 0;overflow: hidden;font-size: 0 }.desktop_hide, .desktop_hide table {display: table !important;max-height: none !important }}</style> </head> <body style="background-color:#fff;margin:0;padding:0;-webkit-text-size-adjust:none;text-size-adjust:none"> <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-color:#fff"> <tbody> <tr> <td> <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0"> <tbody> <tr> <td> <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;color:#000;width:600px;margin:0 auto" width="600"> <tbody> <tr> <td class="column column-1" width="100%" style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;padding-bottom:30px;padding-left:20px;padding-right:20px;padding-top:5px;vertical-align:top;border-top:0;border-right:0;border-bottom:0;border-left:0"> <table class="text_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word"> <tr> <td class="pad"> <div style="font-family:sans-serif"> <div class style="font-size:12px;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;mso-line-height-alt:14.399999999999999px;color:#333;line-height:1.2"> <p style="margin:0;font-size:14px;text-align:center;mso-line-height-alt:16.8px"> <span style="font-size:30px;">Message de : ' + email + '</span></p> </div> </div> </td> </tr> </table> <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0"> <tbody> <tr> <td> <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;color:#000;width:600px;margin:0 auto" width="600"> <tbody> <tr> <td class="column column-1" width="100%" style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;padding-bottom:5px;padding-top:5px;vertical-align:top;border-top:0;border-right:0;border-bottom:0;border-left:0"> <table class="divider_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0"> <tr> <td class="pad"> <div class="alignment" align="center"> <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace:0;mso-table-rspace:0"> <tr> <td class="divider_inner" style="font-size:1px;line-height:1px;border-top:1px solid #dedede"> <span>&#8202;</span></td> </tr> </table> </div> </td> </tr> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <table class="text_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word"> <tr> <td class="pad"> <div style="font-family:sans-serif"> <div class style="font-size:12px;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;mso-line-height-alt:21.6px;color:#333;line-height:1.8"> <p style="margin:0;text-align:center;mso-line-height-alt:30.6px"> <span style="font-size:17px;">' + message + '</span> </p> </div> </div> </td> </tr> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0"> <tbody> <tr> <td> <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;color:#000;width:600px;margin:0 auto" width="600"> <tbody> <tr> <td class="column column-1" width="100%" style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;padding-bottom:25px;padding-top:25px;vertical-align:top;border-top:0;border-right:0;border-bottom:0;border-left:0"> <table class="empty_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0"> <tr> <td class="pad"> <div></div> </td> </tr> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table><!-- End --> </body> </html>',
        }

        mailer.sendMail(options);

        return { success: true, recipient: recipient, email: email };
    }
};
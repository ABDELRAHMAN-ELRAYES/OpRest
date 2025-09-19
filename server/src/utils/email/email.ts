import { createTransport, SendMailOptions, Transporter } from 'nodemailer';
import config from '../../config/config';
import { convert } from 'html-to-text';
import { renderEmailTemplate } from './email-template-render';

class Email {
  private to: string;
  private from: string;
  constructor(from: string, to: string) {
    this.from = from;
    this.to = to;
  }
  // Create a new Transporter once we want to send an email
  private createTransporter(): Transporter {
    return createTransport({
      service: config.mail.service,
      host: config.mail.host,
      port: config.mail.port,
      auth: {
        user: config.mail.user,
        pass: config.mail.password,
      },
    });
  }
  // Send email using options
  send(emailType: string, subject: string,emailTemplateData:any) {
    // TODO : must be configured and modified
    // const emailTemplateData = {
    //   name: 'ahmed ali',
    //   email:''
    // };
    const html = renderEmailTemplate(emailType, emailTemplateData);
    const mailOptions: SendMailOptions = {
      from: this.from,
      to: this.to,
      html,
      subject,
      text: convert(html),
    };
    return this.createTransporter().sendMail(mailOptions);
  }
}
export default Email;

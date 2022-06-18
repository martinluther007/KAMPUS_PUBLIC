const nodemailer = require('nodemailer');
// const sendInBlue  = require('nodemailer-sendinblue-transport');
module.exports = class Email {
    constructor(user,url) {
      this.to = user.email;
      this.firstName = user.firstName;
      this.url = url;
      this.from = `evans <${process.env.EMAIL_FROM}>` ;
    }

    newTransport() {
      if(process.env.NODE_ENV === 'production'){

        return nodemailer.createTransport({
          service:'"SendinBlue"',
          port:587,
          host:'smtp-relay.sendinblue.com',
          auth:{
            user:'martinlutherakuhwa@gmail.com',
            pass:'6fAnKd5xLTZ8acVm'
          }
        })
      }

      return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user:process.env.EMAIL_USERNAME,
          pass:process.env.EMAIL_PASSWORD
        }
      });

    }

    async send(subject,text) {
      // send the actual email

      const mailOptions = {
        from: this.from,
        to: this.to,
        subject,
        text: text
      };

      // create transport and send email
        await this.newTransport().sendMail(mailOptions);
    }


    async sendWelcome() {
      await this.send(`welcome`,'welcome to the hifl family, we are glad to have you')
    }

    async sendPasswordReset( message) {
      await this.send(`password Reset`, message)
    }

    async sendPaymentConfirm () {
      await this.send('payment confirmation')
    }
}

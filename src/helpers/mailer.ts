import User from '@/models/userModel';
import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'


export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashToken = await bcryptjs.hash(userId.toString(), 10)

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, { verifyToken: hashToken, verifyTokenExpiry: Date.now() + 3600000 })
    }
    else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, { forgotPasswordToken: hashToken, forgetPasswordTokenExpiry: Date.now() + 3600000 })
    }
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILER_USER, //❌ (Use procces.env.user instead of this line)
        pass: process.env.MAILER_PASS  //❌ (Use procces.env.pass instead of this line)
      }
    });
    const mailOptions = {
      from: 'YashWardhan.ai', // sender address
      to: email, // list of receivers
      subject: emailType === 'VERIFY' ? "Verify your email" : "Reset Password", // Subject line
      html: `<p>Click<a href="${process.env.DOMAIN}/${emailType === 'VERIFY'? "verifyemail":"resetpassword"}?token=${hashToken}">here</a>to ${emailType === 'VERIFY'? "verifyemail":"resetpassword"} or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/${emailType === 'VERIFY'? "verifyemail":"resetpassword"}?token=${hashToken} </p>`, // html body
    }
    const mailResponse = await transport.sendMail(mailOptions)
    return mailResponse
  } catch (error: any) {
    console.log(`Something Issue in NodeMailer : - ${error.message}`)
  }
}
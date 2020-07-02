const nodemailer = require("nodemailer");

const config = new AWS.Config({
  region: "us-east-1",
  secretAccessKey: process.env.SECRET,
  accessKeyId: process.env.KEY_ID,
});
const ses = new AWS.SES(config);

function sendResetLink(email, id) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "noreply.elivehealth@gmail.com",
      pass: "1234qwer!@#$QWER",
    },
  });

  let mailOptions = {
    from: "noreply.eliveheath@gmail.com",
    to: email,
    subject: "Elive Forgot Password",
    text: `To reset your password, please click on this link: http://elive-web.herokuapp.com/reset/${id}`,
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log(err);
    }
  });
  const params = {
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Text: {
          Charset: "UTF-8",
          Data: `To reset your password, please click on this link: http://localhost:3000/reset/${id}`,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Reset password instructions",
      },
    },
    Source: "noreply@elive.com",
  };

  ses.sendEmail(params, (err) => {
    if (err) {
      console.log(err);
    }
  });
}

module.exports = sendResetLink;

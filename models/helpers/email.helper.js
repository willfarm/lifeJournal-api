const nodemailer = require("nodemailer");

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
}

module.exports = sendResetLink;

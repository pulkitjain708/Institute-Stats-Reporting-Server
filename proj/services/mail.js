module.exports = function(mailOptions) {
  nodemailer = require("nodemailer");
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: require("../opts.json").email,
      pass: require("../opts.json").password
    }
  });

  return function mail(mailOptions) {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) console.log(err);
      else {
        console.log(info.response);
      }
    });
  };
};

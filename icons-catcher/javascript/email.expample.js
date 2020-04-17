var nodeMailer = require('nodemailer');

var transporter = nodeMailer.createTransport({
  // service settings
  service: 'qq',
  // or
  host: 'stmp.163.com',
  secureConnection: true,
  port: 465,
  auth: {
    user: 'example@test.com',
    pass: 'password'
  }
});

var mailOps = {
  from: 'test <expample@test.com>',
  to: '',
  subject: 'Default',
  text: 'Default text'
};

exports.sendEmail = function (ops, cb) {
  var mailOps_ = Object.assign({}, mailOps, ops);
  transporter.sendMail(mailOps_, function (err, info) { cb(err, info); });
}

var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/submit', (req, res) => {
    const {
      fullname,
      email,
      phone,
      AnnualSalary,
      applications,
      location,
      Qualification,
      Skills,
      Experience
    } = req.body;
  
    // Configure the email transport using Nodemailer
    const transporter = nodemailer.createTransport({
        host: 'smtppro.zoho.in',
        port: 465,
        secure: true, // use SSL
        auth: {
          user: 'noreply@datagateway.in',
          pass: 'Apple7620@'
        }
      });
  
    // Configure the email options
    const mailOptions = {
      from: 'noreply@datagateway.in',
      to: email,
      subject: 'Application Received',
      text: `Dear ${fullname},
  
  Thank you for applying for the position of ${applications}. We have received your application and our team will review it shortly.
  
  Here are the details you submitted:
  - Full Name: ${fullname}
  - Email: ${email}
  - Phone: ${phone}
  - Annual Salary: ${AnnualSalary}
  - Location: ${location}
  - Qualification: ${Qualification}
  - Skills: ${Skills}
  - Experience: ${Experience} years
  
  Best regards,
  Your Company Name
      `
    };
  
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
      } else {
        console.log('Email sent:', info.response);
        res.status(200).send('Application submitted successfully');
      }
    });
  });
  module.exports = router;

var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer'); // Add this line to require nodemailer

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/contact', (req, res) => {
    const { name, lastname, email, companyname, subject } = req.body;

    // Validation: You might want to add more validation here

    // Create a transporter
    const transporter = nodemailer.createTransport({
        host: 'smtppro.zoho.in',
        port: 465,
        secure: true, // use SSL
        auth: {
          user: 'noreply@datagateway.in',
          pass: 'Apple7620@'
        }
      });

    // Define email options
    const mailOptions = {
        from: 'noreply@datagateway.in',
        to: 'noreply@datagateway.in',
        subject: 'New Contact Form Submission',
        text: `Name: ${name}\nLastname: ${lastname}\nCompany Name: ${companyname}\nEmail: ${email}\nMessage: ${subject}`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error:', error);
            res.status(500).json({ success: false, error: 'Failed to send email' });
        } else {
            console.log('Email sent:', info.response);
            res.status(200).json({ success: true, message: 'Email sent successfully' });
        }
    });
});

module.exports = router;


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
      applications,
      location,
      Qualification,
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
  
    // Email to the applicant
    const mailOptionsApplicant = {
      from: 'noreply@datagateway.in',
      to: email,
      subject: 'Application Received',
      html: `Dear ${fullname},<br><br>
             Thank you for applying for the position of <strong>${applications}</strong>. We have received your application and our team will review it shortly. We will get back to you soon.<br><br>
             Best regards,<br>
             Datagateway`
    };
  
    // Email to noreply@datagateway.in with full application details
    const mailOptionsInternal = {
      from: 'noreply@datagateway.in',
      to: 'info@datagateway.in',
      subject: 'New Job Application Received from Datagateway.in',
      text: `
  Full Name: ${fullname}
  Email: ${email}
  Phone: ${phone}
  Application: ${applications}
  Location: ${location}
  Qualification: ${Qualification}
  Experience: ${Experience}
 
      `
    };
  
    // Send email to the applicant
    transporter.sendMail(mailOptionsApplicant, (error, info) => {
      if (error) {
        console.error('Error sending email to applicant:', error);
        res.status(500).send('Error sending email to applicant');
      } else {
        console.log('Email sent to applicant:', info.response);
        
        // Send email with full details to noreply@datagateway.in
        transporter.sendMail(mailOptionsInternal, (error, info) => {
          if (error) {
            console.error('Error sending internal email:', error);
            res.status(500).send('Error sending internal email');
          } else {
            console.log('Internal email sent:', info.response);
            res.status(200).send('Application submitted successfully');
          }
        });
      }
    });
  });
  module.exports = router;

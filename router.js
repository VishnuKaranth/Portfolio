const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const fetch = require('node-fetch');
const xss = require('xss');
const nodemailer = require('nodemailer');

// Configure rate limiting
const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes'
});

// Apply rate limiting to form submission endpoint
router.post('/submit-form', formLimiter, [
  // Server-side validation of all fields
  body('honeypot').custom(value => {
    if (value) {
      // If honeypot field is filled, it's likely a bot
      throw new Error('Bot detected');
    }
    return true;
  }),
  body('csrf_token')
    .notEmpty().withMessage('CSRF token is required'),
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/).withMessage('Name can only contain letters and spaces'),
  body('email')
    .trim()
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail()
    .isLength({ max: 100 }).withMessage('Email must be less than 100 characters'),
  body('subject')
    .trim()
    .isLength({ min: 2, max: 100 }).withMessage('Subject must be between 2 and 100 characters')
    .matches(/^[a-zA-Z0-9\s.,!?-]+$/).withMessage('Subject contains invalid characters'),
  body('message')
    .trim()
    .isLength({ min: 10, max: 1000 }).withMessage('Message must be between 10 and 1000 characters')
], async (req, res) => {
  try {
    // Check validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    // Verify CSRF token
    const sessionToken = req.session.csrf_token || req.cookies.csrf_token;
    if (req.body.csrf_token !== sessionToken) {
      return res.status(403).json({ success: false, message: 'Invalid CSRF token' });
    }

    // Verify reCAPTCHA
    const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=YOUR_RECAPTCHA_SECRET_KEY&response=${req.body['g-recaptcha-response']}`
    }).then(response => response.json());

    if (!recaptchaResponse.success) {
      return res.status(400).json({ success: false, message: 'reCAPTCHA verification failed' });
    }

    // Sanitize all inputs to prevent XSS
    const sanitizedData = {
      name: xss(req.body.name),
      email: xss(req.body.email),
      subject: xss(req.body.subject),
      message: xss(req.body.message)
    };

    // Send email (example using nodemailer)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'your-email@example.com', // Your receiving email address
      subject: `Portfolio Contact: ${sanitizedData.subject}`,
      text: `
        Name: ${sanitizedData.name}
        Email: ${sanitizedData.email}
        
        Message:
        ${sanitizedData.message}
      `,
      html: `
        <h3>New message from your portfolio</h3>
        <p><strong>Name:</strong> ${sanitizedData.name}</p>
        <p><strong>Email:</strong> ${sanitizedData.email}</p>
        <p><strong>Message:</strong></p>
        <p>${sanitizedData.message.replace(/\n/g, '<br>')}</p>
      `
    };

    // Log contact attempt (for security auditing)
    console.log(`Contact attempt from: ${req.ip} - ${sanitizedData.email}`);

    await transporter.sendMail(mailOptions);
    
    // Generate new CSRF token for next submission
    const newCsrfToken = require('crypto').randomBytes(16).toString('hex');
    req.session.csrf_token = newCsrfToken;
    res.cookie('csrf_token', newCsrfToken, { httpOnly: true, sameSite: 'strict' });
    
    return res.status(200).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Form submission error:', error);
    return res.status(500).json({ success: false, message: 'Server error, please try again later' });
  }
});

module.exports = router;
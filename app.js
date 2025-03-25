const express = require('express');
const helmet = require('helmet');
const app = express();

// Basic security headers using Helmet
app.use(helmet());

// Additional custom security headers
app.use((req, res, next) => {
  // Content Security Policy (CSP)
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' https://cdnjs.cloudflare.com https://www.google.com https://www.gstatic.com 'unsafe-inline'; " +
    "style-src 'self' https://cdnjs.cloudflare.com https://fonts.googleapis.com 'unsafe-inline'; " +
    "img-src 'self' data:; " +
    "font-src 'self' https://cdnjs.cloudflare.com https://fonts.googleapis.com; " +
    "connect-src 'self' https://docs.google.com; " +  // ✅ Allow Google Forms
    "frame-src https://www.google.com; " +
    "object-src 'none';"
  );
  
  
  

  // HTTP Strict Transport Security (HSTS)
  res.setHeader(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload'
  );

  // Prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');

  // Referrer Policy
  res.setHeader('Referrer-Policy', 'no-referrer-when-downgrade');

  // Feature Policy to limit browser features
  res.setHeader(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(self), payment=()'
  );

  // X-Frame-Options to prevent clickjacking
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');

  // X-XSS-Protection as an additional layer of protection
  res.setHeader('X-XSS-Protection', '1; mode=block');

  next();
});

// Middleware to check file downloads and add security headers
app.use('/downloads', (req, res, next) => {
  // Add specific headers for downloadable content
  res.setHeader('Content-Disposition', 'attachment');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // Basic validation for allowed file types
  const filePath = req.path;
  const allowedExtensions = ['.pdf', '.docx', '.txt'];
  const hasAllowedExtension = allowedExtensions.some(ext => filePath.endsWith(ext));
  
  if (!hasAllowedExtension) {
    return res.status(403).send('Forbidden file type');
  }
  
  next();
});

// Export the configured app
module.exports = app;
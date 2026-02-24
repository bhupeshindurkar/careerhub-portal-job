const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Send email function
exports.sendEmail = async (options) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `CareerHub Pro <${process.env.EMAIL_USER}>`,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Email error:', error);
    // Don't throw error to prevent breaking the main flow
    return null;
  }
};

// Email templates
exports.welcomeEmail = (name) => {
  return {
    subject: 'Welcome to CareerHub Pro',
    html: `
      <h1>Welcome ${name}!</h1>
      <p>Thank you for joining CareerHub Pro. We're excited to have you on board.</p>
      <p>Start exploring thousands of job opportunities today!</p>
      <p>Best regards,<br>CareerHub Pro Team</p>
    `
  };
};

exports.applicationConfirmation = (name, jobTitle) => {
  return {
    subject: 'Application Submitted Successfully',
    html: `
      <h1>Application Submitted</h1>
      <p>Hi ${name},</p>
      <p>Your application for <strong>${jobTitle}</strong> has been submitted successfully.</p>
      <p>We'll notify you once the employer reviews your application.</p>
      <p>Best regards,<br>CareerHub Pro Team</p>
    `
  };
};

exports.statusUpdateEmail = (name, jobTitle, status) => {
  return {
    subject: `Application Status Update - ${jobTitle}`,
    html: `
      <h1>Application Status Update</h1>
      <p>Hi ${name},</p>
      <p>Your application for <strong>${jobTitle}</strong> has been updated.</p>
      <p>Status: <strong>${status}</strong></p>
      <p>Best regards,<br>CareerHub Pro Team</p>
    `
  };
};

// OTP Email Template
exports.sendOTPEmail = (email, otp, name = 'User') => {
  return {
    to: email,
    subject: 'Password Reset OTP - CareerHub Pro',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .otp-box { background: white; border: 3px dashed #667eea; padding: 20px; text-align: center; margin: 20px 0; border-radius: 10px; }
          .otp-code { font-size: 36px; font-weight: bold; color: #667eea; letter-spacing: 8px; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          .warning { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔐 Password Reset Request</h1>
          </div>
          <div class="content">
            <p>Hi <strong>${name}</strong>,</p>
            <p>We received a request to reset your password for your CareerHub Pro account.</p>
            
            <div class="otp-box">
              <p style="margin: 0; font-size: 14px; color: #666;">Your OTP Code:</p>
              <div class="otp-code">${otp}</div>
              <p style="margin: 10px 0 0 0; font-size: 12px; color: #999;">Valid for 10 minutes</p>
            </div>
            
            <p>Enter this code on the password reset page to continue.</p>
            
            <div class="warning">
              <strong>⚠️ Security Notice:</strong>
              <ul style="margin: 10px 0 0 0; padding-left: 20px;">
                <li>Never share this OTP with anyone</li>
                <li>CareerHub Pro will never ask for your OTP</li>
                <li>If you didn't request this, please ignore this email</li>
              </ul>
            </div>
            
            <p>If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.</p>
            
            <p>Best regards,<br><strong>CareerHub Pro Team</strong></p>
          </div>
          <div class="footer">
            <p>This is an automated email. Please do not reply.</p>
            <p>© 2024 CareerHub Pro. All rights reserved.</p>
            <p>Developed by BHUPESH INDURKAR</p>
          </div>
        </div>
      </body>
      </html>
    `
  };
};

// Contact Form Email - Send to Admin
exports.sendContactFormEmail = (name, email, subject, message) => {
  return {
    to: process.env.ADMIN_EMAIL || 'bhupeshindurkar6@gmail.com',
    subject: `Contact Form: ${subject}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          .info-box { background: #f0f4ff; border-left: 4px solid #667eea; padding: 15px; margin: 20px 0; border-radius: 5px; }
          .message-box { background: #fff; border: 2px solid #e0e0e0; padding: 20px; margin: 20px 0; border-radius: 10px; }
          .label { font-weight: bold; color: #667eea; margin-bottom: 5px; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📧 New Contact Form Submission</h1>
          </div>
          <div class="content">
            <p>You have received a new message from the CareerHub Pro contact form.</p>
            
            <div class="info-box">
              <div class="label">From:</div>
              <p style="margin: 5px 0;"><strong>${name}</strong></p>
              
              <div class="label" style="margin-top: 15px;">Email:</div>
              <p style="margin: 5px 0;"><a href="mailto:${email}" style="color: #667eea;">${email}</a></p>
              
              <div class="label" style="margin-top: 15px;">Subject:</div>
              <p style="margin: 5px 0;">${subject}</p>
              
              <div class="label" style="margin-top: 15px;">Date:</div>
              <p style="margin: 5px 0;">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
            </div>
            
            <div class="message-box">
              <div class="label">Message:</div>
              <p style="margin-top: 10px; white-space: pre-wrap;">${message}</p>
            </div>
            
            <p style="margin-top: 20px;">
              <strong>Quick Reply:</strong> 
              <a href="mailto:${email}?subject=Re: ${subject}" style="color: #667eea; text-decoration: none;">
                Click here to reply directly
              </a>
            </p>
          </div>
          <div class="footer">
            <p>This email was sent from CareerHub Pro Contact Form</p>
            <p>© 2024 CareerHub Pro. All rights reserved.</p>
            <p>Developed by BHUPESH INDURKAR</p>
          </div>
        </div>
      </body>
      </html>
    `
  };
};

// Contact Form Confirmation - Send to User
exports.sendContactConfirmationEmail = (name, email) => {
  return {
    to: email,
    subject: 'Thank you for contacting CareerHub Pro',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Message Received!</h1>
          </div>
          <div class="content">
            <p>Hi <strong>${name}</strong>,</p>
            <p>Thank you for reaching out to CareerHub Pro! We have received your message and will get back to you within 24 hours.</p>
            <p>Our team is reviewing your inquiry and will respond as soon as possible.</p>
            <p>In the meantime, feel free to explore our platform:</p>
            <ul>
              <li>Browse thousands of job opportunities</li>
              <li>Complete your profile to stand out</li>
              <li>Connect with top employers</li>
            </ul>
            <p>Best regards,<br><strong>CareerHub Pro Team</strong><br>Developed by BHUPESH INDURKAR</p>
          </div>
          <div class="footer">
            <p>This is an automated confirmation email.</p>
            <p>© 2024 CareerHub Pro. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `
  };
};

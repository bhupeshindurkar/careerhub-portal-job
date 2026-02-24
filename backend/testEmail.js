/**
 * Test Email Configuration
 * Run: node testEmail.js
 */

require('dotenv').config();
const { sendEmail, sendContactFormEmail } = require('./utils/emailService');

async function testEmail() {
  console.log('\n=== Testing Email Configuration ===\n');
  
  console.log('Environment Variables:');
  console.log('EMAIL_HOST:', process.env.EMAIL_HOST);
  console.log('EMAIL_PORT:', process.env.EMAIL_PORT);
  console.log('EMAIL_USER:', process.env.EMAIL_USER);
  console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '***SET***' : 'NOT SET');
  console.log('ADMIN_EMAIL:', process.env.ADMIN_EMAIL || 'NOT SET');
  console.log('\n');

  if (!process.env.EMAIL_USER || process.env.EMAIL_USER === 'your_email@gmail.com') {
    console.error('❌ ERROR: EMAIL_USER not configured properly!');
    console.log('\nPlease set these environment variables:');
    console.log('1. EMAIL_USER=your_gmail@gmail.com');
    console.log('2. EMAIL_PASS=your_app_specific_password');
    console.log('3. ADMIN_EMAIL=bhupeshindurkar6@gmail.com');
    console.log('\nTo get App Password:');
    console.log('1. Go to: https://myaccount.google.com/apppasswords');
    console.log('2. Create new app password');
    console.log('3. Copy and use it as EMAIL_PASS');
    return;
  }

  try {
    console.log('Sending test email...\n');
    
    const emailData = sendContactFormEmail(
      'Test User',
      'test@example.com',
      'Test Contact Form',
      'This is a test message from contact form.'
    );
    
    const result = await sendEmail(emailData);
    
    if (result) {
      console.log('✅ Email sent successfully!');
      console.log('Message ID:', result.messageId);
      console.log('\nCheck your email:', process.env.ADMIN_EMAIL || 'bhupeshindurkar6@gmail.com');
    } else {
      console.log('❌ Email failed to send. Check logs above for errors.');
    }
  } catch (error) {
    console.error('❌ Error sending email:', error.message);
    console.error('\nCommon issues:');
    console.error('1. Gmail App Password not set correctly');
    console.error('2. Less secure app access disabled');
    console.error('3. 2-Step Verification not enabled');
    console.error('\nSolution:');
    console.error('Use Gmail App Password: https://myaccount.google.com/apppasswords');
  }
}

testEmail();

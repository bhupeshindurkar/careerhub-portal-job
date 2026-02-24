const { sendEmail, sendContactFormEmail, sendContactConfirmationEmail } = require('../utils/emailService');

// @desc    Send contact form message
// @route   POST /api/contact
// @access  Public
exports.sendContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide all required fields'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide a valid email address'
      });
    }

    // Send email to admin
    const adminEmailData = sendContactFormEmail(name, email, subject, message);
    await sendEmail(adminEmailData);

    // Send confirmation email to user
    const userEmailData = sendContactConfirmationEmail(name, email);
    await sendEmail(userEmailData);

    res.json({
      status: 'success',
      message: 'Message sent successfully! We will get back to you soon.'
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to send message. Please try again later.'
    });
  }
};

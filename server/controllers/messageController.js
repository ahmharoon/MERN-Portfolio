const Message = require('../models/Message');
const NotificationSettings = require('../models/NotificationSettings');
const sendEmail = require('../utils/sendEmail');

// @desc    Submit a new contact message
// @route   POST /api/messages
// @access  Public
const submitMessage = async (req, res) => {
  try {
    const { name, email, subject, content } = req.body;

    // 1. Save to MongoDB
    const message = await Message.create({
      name,
      email,
      subject,
      content,
    });

    // 2. Fetch Notification Emails
    const settings = await NotificationSettings.findOne();
    const adminEmails = settings && settings.emails.length > 0 ? settings.emails : [];

    // 3. Send Emails via Nodemailer
    if (adminEmails.length > 0 && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const emailHtml = `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${content}</p>
      `;

      // Send to all admin emails
      adminEmails.forEach(async (adminEmail) => {
        try {
          await sendEmail({
            email: adminEmail,
            subject: `New Portfolio Message: ${subject || 'No Subject'}`,
            html: emailHtml,
            message: content,
          });
        } catch (emailError) {
          console.error(`Failed to send email to ${adminEmail}: ${emailError.message}`);
        }
      });
    }

    res.status(201).json({ message: 'Message submitted successfully', data: message });
  } catch (error) {
    res.status(400).json({ message: 'Failed to submit message', error: error.message });
  }
};

// @desc    Get all messages
// @route   GET /api/messages
// @access  Private/Admin
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({}).sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { submitMessage, getMessages };

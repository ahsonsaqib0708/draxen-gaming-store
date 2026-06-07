// Vercel Serverless Function for contact form
module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, topic, message } = req.body || {};

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Missing required fields: name, email, message' });
    }

    // Log to server console
    console.log('[CONTACT]', { name, email, topic, message, at: new Date().toISOString() });

    // If SMTP is configured, send email
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
        try {
            const nodemailer = require('nodemailer');
            const transporter = nodemailer.createTransport({
                service: process.env.SMTP_SERVICE || 'gmail',
                auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
            });
            await transporter.sendMail({
                from: `"DRAXEN Gaming" <${process.env.SMTP_USER}>`,
                to: process.env.STORE_EMAIL || process.env.SMTP_USER,
                replyTo: email,
                subject: `DRAXEN contact: ${topic || 'general'}`,
                text: `New message from ${name}\nEmail: ${email}\nTopic: ${topic || 'general'}\n\n${message}`
            });
        } catch (err) {
            console.error('Email send failed:', err.message);
        }
    }

    return res.status(201).json({ ok: true, contactId: 'MSG-' + Date.now() });
};

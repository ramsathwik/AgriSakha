import nodemailer from 'nodemailer';
import logger from './logger.js';
import config from '../config/env.js';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.email.user,
    pass: config.email.pass,
  }
});

export const sendFarmerQueryAlertEmail = async (adminMail, farmer) => {
  const { fullname , phone , address, query } = farmer;

  const htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF--8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New Farmer Query Alert</title>
    <style>
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        background-color: #f4f4f7;
        margin: 0;
        padding: 20px;
        color: #333;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        background: #ffffff;
        padding: 30px 25px;
        border-radius: 10px;
        border: 1px solid #e0e0e0;
        box-shadow: 0 4px 12px rgba(0,0,0,0.08);
      }
      h2 {
        margin-top: 0;
        color: #2c3e50;
        border-bottom: 2px solid #3498db;
        padding-bottom: 10px;
      }
      p {
        font-size: 16px;
        line-height: 1.6;
        color: #555555;
      }
      .details-section {
        background-color: #f9f9f9;
        border-left: 4px solid #3498db;
        padding: 15px 20px;
        margin: 20px 0;
        border-radius: 5px;
      }
      .details-section h3 {
        margin-top: 0;
        color: #2c3e50;
      }
      .details-section strong {
        display: inline-block;
        width: 120px; /* Aligns the details */
        color: #333;
      }
      .query-box {
        border: 1px solid #ddd;
        padding: 15px;
        background-color: #fff;
        border-radius: 5px;
        margin-top: 10px;
        font-style: italic;
      }
      .footer-text {
        font-size: 12px;
        color: #999;
        text-align: center;
        margin-top: 30px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>New Farmer Query for Your Attention</h2>
      <p>Dear Admin,</p>
      <p>
        A new query has been submitted by a farmer located in your state. Please find their details below and contact them to provide assistance.
      </p>

      <div class="details-section">
        <h3>Farmer's Contact Information</h3>
        <p><strong>Name:</strong> ${fullname}</p>
        <p><strong>Phone Number:</strong> ${phone}</p>
        <p><strong>Address:</strong> ${address.fullAddress}</p>
        <p><strong>District:</strong> ${address.district}</p>
        <p><strong>Coordinates:</strong> ${address.location.coordinates}</p>
      </div>
      
      <div class="details-section">
        <h3>Farmer's Query</h3>
        <div class="query-box">
          <p>${query}</p>
        </div>
      </div>

      <p>Please reach out to the farmer at your earliest convenience to resolve their issue.</p>
      
      <p class="footer-text">
        This is an automated notification from the Farmer Support System.
      </p>
    </div>
  </body>
  </html>
  `;

  const mailOptions = {
    from: `"Farmer Support System" <${config.email.user}>`, 
    to: adminMail,
    subject: 'A complex Farmer Query received from your region',
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    logger.info(`Farmer query alert sent successfully to ${adminMail}`);
  } catch (error) {
    logger.error('Farmer query alert send failed', { adminMail: adminMail, farmerName: name, error: error.message });
    throw new Error('Email could not be sent.');
  }
};
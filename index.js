import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
dotenv.config(); // Load environment variables from .env file

const app = express();
const port = 3000;
app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
  })
);
app.use(bodyParser.json()); // Parse JSON bodies

app.post("/test", (req, res) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: "damangowdaman@gmail.com",
    subject: "Test Email",
    text: "This is a test email sent from the /test endpoint.",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send("Test email sent: " + info.response);
  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;
  console.log("Request body: ", name, email, message);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.SMTP_USER,
    subject: "New Contact Form Submission",
    html: `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
            }
            .container {
              padding: 20px;
              border: 1px solid #ddd;
              border-radius: 5px;
              background-color: #f9f9f9;
            }
            .header {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 20px;
            }
            .content {
              font-size: 16px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">New Contact Form Submission</div>
            <div class="content">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Message:</strong> ${message}</p>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  const ackMailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: "Acknowledgment of Internship Application",
    html: `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
            }
            .container {
              padding: 20px;
              border: 1px solid #ddd;
              border-radius: 5px;
              background-color: #f9f9f9;
            }
            .header {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 20px;
            }
            .content {
              font-size: 16px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">Acknowledgment from G-ZofTech Tech Solutions</div>
            <div class="content">
              <p>Dear ${name},</p>
              <p>Thank you for your interest in the internship position at G-ZofTech. We have successfully received your application, and our team will carefully review it. You can expect to hear from us soon with updates on the next steps.</p>
              <p>Best regards,</p>
              <p>Internship In-charge Team</p>
              <p>G-ZofTech</p>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send("email sent: " + info.response);
  });
  transporter.sendMail(ackMailOptions, (error, info) => {
    if (error) {
      console.error("Error sending acknowledgment email: ", error);
    } else {
      console.log("Acknowledgment email sent: " + info.response);
    }
  });
});

app.post("/apply-internship", (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    dob,
    college,
    year,
    skills,
    interest,
  } = req.body;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.SMTP_USER,
    subject: `New Internship Application from ${firstName} ${lastName}`,
    html: `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
            }
            .container {
              padding: 20px;
              border: 1px solid #ddd;
              border-radius: 5px;
              background-color: #f9f9f9;
            }
            .header {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 20px;
            }
            .content {
              font-size: 16px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">New Internship Application</div>
            <div class="content">
              <p><strong>First Name:</strong> ${firstName}</p>
              <p><strong>Last Name:</strong> ${lastName}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone}</p>
              <p><strong>Date of Birth:</strong> ${dob}</p>
              <p><strong>College:</strong> ${college}</p>
              <p><strong>Year:</strong> ${year}</p>
              <p><strong>Skills:</strong> ${skills}</p>
              <p><strong>Interest:</strong> ${interest}</p>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send("Application received: " + info.response);
  });

  const ackMailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: "Acknowledgment from G-ZofTech Tech Solutions",
    html: `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
            }
            .container {
              padding: 20px;
              border: 1px solid #ddd;
              border-radius: 5px;
              background-color: #f9f9f9;
            }
            .header {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 20px;
            }
            .content {
              font-size: 16px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">Acknowledgment from G-ZofTech Tech Solutions</div>
            <div class="content">
              <p>Dear ${firstName} ${lastName},</p>
              <p>Thank you for your interest in the internship position with us. Our team will review your application and reach out to you soon.</p>
              <p>Best regards,</p>
              <p>G-ZofTech Tech Solutions</p>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  transporter.sendMail(ackMailOptions, (error, info) => {
    if (error) {
      console.error("Error sending acknowledgment email: ", error);
    } else {
      console.log("Acknowledgment email sent: " + info.response);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

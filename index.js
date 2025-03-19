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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/contact", (req, res) => {
  console.log(req.body);
  console.log("Email: ", process.env.EMAIL);

  // Corrected the route to include '/'
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: req.body.email,
    to: process.env.EMAIL,
    subject: "contact form",
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
                    <div class="header">Name - ${req.body.name}</div>
                    <div class="content"><strong>message</strong> <br>${req.body.message}</div>
                </div>
            </body>
        </html>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send("Email sent: " + info.response);
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
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: email,
    to: "damangowdaman@gmail.com",
    subject: "Internship Application",
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
            <div class="header">Internship Application from ${firstName} ${lastName}</div>
            <div class="content">
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
    from: process.env.EMAIL,
    to: req.body.email,
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
            <div class="header">Thank you for contacting G-ZofTech Tech Solutions, ${firstName} ${lastName}</div>
            <div class="content">We have received your application and will get back to you shortly.</div>
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

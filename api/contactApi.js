import mongoose from "mongoose";
import joi from "joi";
import nodemailer from "nodemailer";

// -------------------------
// ENV VARIABLES
// -------------------------
const { SMTP_SERVICE_NAME, MONGODB_URI, SMTP_MAIL, SMTP_PASS } =
  process.env;

// -------------------------
// DATABASE CONNECTION
// -------------------------
let cached = null;
const dbConnection = async () => {
  try {
    if (cached) return cached;
    cached = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
      tls: true,
    });
    return cached;
  } catch (error) {
    console.log("Error While Connecting Database", error);
  }
};

// -------------------------
// MONGODB SCHEMA
// -------------------------
const contactSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "* Full Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "* Email is required"],
      lowercase: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "* Phone Number is required"],
      trim: true,
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

const contactModel =
  mongoose.models.contactModel || mongoose.model("contactModel", contactSchema);

// -------------------------
// VALIDATION SCHEMA
// -------------------------
const contactValidationSchema = joi.object({
  fullName: joi.string().required().messages({
    "string.base": "* Full Name must be string",
    "any.required": "* Full Name is required",
  }),
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.base": "* Email must be string",
      "any.required": "* Email is required",
    }),
  phoneNumber: joi.string().required().messages({
    "string.base": "* Phone Number must be string",
    "any.required": "* Phone Number is required",
  }),
  message: joi.string().allow(""),
});

// -------------------------
// TRANSPORTER
// -------------------------
const transporter = nodemailer.createTransport({
  service: SMTP_SERVICE_NAME,
  auth: { user: SMTP_MAIL, pass: SMTP_PASS },
});

// -------------------------
// SEND MAIL
// -------------------------
const sendMail = async (from, to, subject, template) => {
  try {
    let info = await transporter.sendMail({
      from,
      to,
      subject,
      html: template,
    });
    if (info) console.log("Mail Sent Successfully");
  } catch (error) {
    console.log("Error While Sending Mail", error);
  }
};

// -------------------------
// Admin Mail Template (MaaKalika Agro)
// -------------------------
const firmTemplate = (data) => {
  let { fullName, email, phoneNumber, message } = data;
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: Arial, sans-serif; background:#f7f7f7; padding:30px; }
      .wrapper { max-width:650px; margin:auto; background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 6px 20px rgba(0,0,0,0.1); }
      .header { background:rgba(0,0,0,0.7); color:white; text-align:center; padding:25px; font-size:26px; font-weight:600; }
      .content { padding:30px; }
      table { width:100%; border-collapse:collapse; }
      th,td { padding:12px; text-align:left; }
      th { background:rgba(0,0,0,0.7); color:#fff; width:30%; }
      td { background:#fafafa; }
    </style>
  </head>
  <body>
    <div class="wrapper">
      <div class="header">MaaKalika Agro - New Contact Submission</div>
      <div class="content">
        <p>You have received a new inquiry from your website:</p>
        <table>
          <tr><th>Full Name</th><td>${fullName}</td></tr>
          <tr><th>Email</th><td>${email}</td></tr>
          <tr><th>Phone</th><td>${phoneNumber}</td></tr>
          <tr><th>Message</th><td>${message || "-"}</td></tr>
        </table>
      </div>
    </div>
  </body>
  </html>
  `;
};

// -------------------------
// User Mail Template (MaaKalika Agro)
// -------------------------
const userTemplate = (data) => {
  let { fullName } = data;
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: Arial, sans-serif; background:#f7f7f7; padding:30px; }
      .wrapper { max-width:650px; margin:auto; background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 6px 20px rgba(0,0,0,0.1); }
      .header { background:rgba(0,0,0,0.7); color:white; text-align:center; padding:25px; font-size:26px; font-weight:600; }
      .content { padding:30px; color:#444; }
      .button { display:inline-block; margin-top:20px; background:rgba(0,0,0,0.7); color:white; padding:12px 22px; border-radius:8px; text-decoration:none; font-weight:600; }
    </style>
  </head>
  <body>
    <div class="wrapper">
      <div class="header">MaaKalika Agro</div>
      <div class="content">
        <h2>Hello ${fullName},</h2>
        <p>Thank you for contacting <strong>MaaKalika Agro</strong>. We have received your message and our team will get back to you soon.</p>
        <a href="https://maakalikaagro.com" class="button">Visit Our Website</a>
      </div>
    </div>
  </body>
  </html>
  `;
};

// -------------------------
// HANDLER
// -------------------------
const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ isSuccess: false, message: "Only POST allowed" });
  }
  try {
    await dbConnection();

    let { fullName, email, phoneNumber, message } = req.body;

    // Validate
    let { error } = contactValidationSchema.validate({
      fullName,
      email,
      phoneNumber,
      message,
    });
    if (error) {
      return res
        .status(400)
        .json({ isSuccess: false, message: "Validation Error", error });
    }

    // Save
    let newContact = new contactModel(req.body);
    let isSaved = await newContact.save();

    if (isSaved) {
      await Promise.all([
        sendMail(
          SMTP_MAIL,
          email,
          "Thank you for contacting MaaKalika Agro",
          userTemplate(req.body)
        ),
        sendMail(
          SMTP_MAIL,
          SMTP_MAIL,
          `New Contact from ${fullName}`,
          firmTemplate(req.body)
        ),
      ]);
      return res
        .status(201)
        .json({ isSuccess: true, message: "Contact saved & emails sent" });
    } else {
      return res
        .status(400)
        .json({ isSuccess: false, message: "Error saving contact" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ isSuccess: false, message: "Internal Server Error" });
  }
};

export default handler;

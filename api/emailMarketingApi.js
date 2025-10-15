import mongoose from "mongoose";
import joi from "joi";
import nodemailer from "nodemailer";

const { SMTP_SERVICE_NAME, MONGODB_URI, SMTP_MAIL, SMTP_PASS } = process.env;

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
const subscriberSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "* Email is required"],
      lowercase: true,
      trim: true,
      unique: true,
    },
    name: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const subscriberModel =
  mongoose.models.subscriberModel ||
  mongoose.model("subscriberModel", subscriberSchema);

// -------------------------
// VALIDATION SCHEMA
// -------------------------
const subscribeValidationSchema = joi.object({
  email: joi.string().email({ tlds: { allow: false } }).required().messages({
    "string.base": "* Email must be string",
    "any.required": "* Email is required",
  }),
  name: joi.string().allow(""),
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
const sendMail = async (to, subject, template) => {
  try {
    let info = await transporter.sendMail({
      from: SMTP_MAIL,
      to,
      subject,
      html: template,
    });
    if (info) console.log(`Mail sent to ${to}`);
  } catch (error) {
    console.log("Error While Sending Mail", error);
  }
};

// -------------------------
// Email Templates
// -------------------------
const marketingTemplate = (data, campaign) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: Arial, sans-serif; background:#f7f7f7; padding:30px; }
      .wrapper { max-width:650px; margin:auto; background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 6px 20px rgba(0,0,0,0.1); }
      .header { background:linear-gradient(135deg,#4BAF47,#2E7D32); color:white; text-align:center; padding:25px; font-size:24px; font-weight:600; }
      .content { padding:30px; color:#444; }
      .button { display:inline-block; margin-top:20px; background:#4BAF47; color:white; padding:12px 22px; border-radius:8px; text-decoration:none; font-weight:600; }
      .footer { font-size:12px; color:#777; text-align:center; padding:15px; background:#f2f2f2; }
    </style>
  </head>
  <body>
    <div class="wrapper">
      <div class="header">${campaign.subject}</div>
      <div class="content">
        <h2>Hello ${data.name || "Subscriber"},</h2>
        <p>${campaign.message}</p>
        ${
          campaign.link
            ? `<a href="${campaign.link}" class="button">Learn More</a>`
            : ""
        }
      </div>
      <div class="footer">
        You are receiving this email because you subscribed to MaaKalika Agro.<br/>
        <a href="${campaign.unsubscribe || "#"}">Unsubscribe</a>
      </div>
    </div>
  </body>
  </html>
  `;
};

// -------------------------
// Subscribe Handler
// -------------------------
export const subscribeHandler = async (req, res) => {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ isSuccess: false, message: "Only POST allowed" });
  }

  try {
    await dbConnection();

    let { email, name } = req.body;

    let { error } = subscribeValidationSchema.validate({ email, name });
    if (error) {
      return res
        .status(400)
        .json({ isSuccess: false, message: "Validation Error", error });
    }

    let subscriber = new subscriberModel({ email, name });
    await subscriber.save();

    return res
      .status(201)
      .json({ isSuccess: true, message: "Subscribed successfully" });
  } catch (err) {
    if (err.code === 11000) {
      return res
        .status(409)
        .json({ isSuccess: false, message: "Email already subscribed" });
    }
    return res
      .status(500)
      .json({ isSuccess: false, message: "Internal Server Error" });
  }
};

// -------------------------
// Send Campaign Handler
// -------------------------
export const sendCampaignHandler = async (req, res) => {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ isSuccess: false, message: "Only POST allowed" });
  }

  try {
    await dbConnection();

    const { subject, message, link, unsubscribe } = req.body;

    if (!subject || !message) {
      return res
        .status(400)
        .json({ isSuccess: false, message: "Subject & Message required" });
    }

    const subscribers = await subscriberModel.find({});
    if (subscribers.length === 0) {
      return res
        .status(400)
        .json({ isSuccess: false, message: "No subscribers found" });
    }

    // Send bulk emails
    await Promise.all(
      subscribers.map((sub) =>
        sendMail(
          sub.email,
          subject,
          marketingTemplate(sub, { subject, message, link, unsubscribe })
        )
      )
    );

    return res
      .status(200)
      .json({ isSuccess: true, message: "Campaign sent successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ isSuccess: false, message: "Internal Server Error" });
  }
};

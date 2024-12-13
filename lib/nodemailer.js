import nodemailer from "nodemailer";

export const sendEmail = async ({
  to,
  subject,
  text,
  from = process.env.EMAIL_USERNAME,
  password = process.env.EMAIL_PASSWORD,
  host = process.env.EMAIL_HOST,
  port = process.env.EMAIL_PORT,
}) => {
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user: from,
      pass: password,
    },
  });

  const mailOptions = {
    from,
    to,
    subject,
    text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    // return info;
    console.log("Email sent: " + info);
    return info.response;
  } catch (error) {
    console.error("Error sending email: " + error);
    throw error;
  }
};

module.exports = sendEmail;

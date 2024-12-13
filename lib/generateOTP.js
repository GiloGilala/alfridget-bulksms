// Generate OTP with expiration time
const generateOTP = (length = 6, type = "numeric", expiryMinutes = 5) => {
  const otp =
    type === "numeric"
      ? generateNumericOTP(length)
      : type === "alphanumeric"
      ? generateAlphanumericOTP(length)
      : (() => {
          throw new Error(
            "Invalid OTP type. Choose either 'numeric' or 'alphanumeric'."
          );
        })();

  const expires = new Date(new Date().getTime() + expiryMinutes * 60 * 1000);

  return { otp, expires };
};

// Generate numeric OTP
const generateNumericOTP = (length = 6) => {
  if (length <= 0) {
    throw new Error("Length must be a positive integer.");
  }
  const min = 10 ** (length - 1);
  const max = 10 ** length - 1;
  return Math.floor(min + Math.random() * (max - min + 1)).toString();
};

// Generate alphanumeric OTP
const generateAlphanumericOTP = (length = 6) => {
  if (length <= 0) {
    throw new Error("Length must be a positive integer.");
  }
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length }, () =>
    characters.charAt(Math.floor(Math.random() * characters.length))
  ).join("");
};

// Example usage
const numericOtpDetails = generateOTP(6, "numeric", 5); // 5 minutes expiry
console.log(`Your numeric OTP is: ${numericOtpDetails.otp}`);
console.log(`Expires at: ${numericOtpDetails.expires}`);

const alphanumericOtpDetails = generateOTP(6, "alphanumeric", 10); // 10 minutes expiry
console.log(`Your alphanumeric OTP is: ${alphanumericOtpDetails.otp}`);
console.log(`Expires at: ${alphanumericOtpDetails.expires}`);

import { randomBytes } from "crypto";

// export const calculateStatusCounts = (recipients, statusCodeMap) => {
//   const counts = {};

//   // Initialize counts for each label in the statusCodeMap
//   statusCodeMap.forEach(({ label }) => {
//     counts[label] = 0;
//   });

//   // Count occurrences based on statusCode
//   recipients.forEach(({ statusCode }) => {
//     const statusEntry = statusCodeMap.find(
//       (entry) => entry.value === statusCode
//     );
//     if (statusEntry) {
//       counts[statusEntry.label]++;
//     }
//   });

//   // Format the result
//   return Object.entries(counts).map(([label, value]) => ({
//     label,
//     value: value > 0 ? value.toString() : "0",
//   }));
// };

export const calculateStatusCounts = (recipients, statusCodeMap) => {
  const counts = recipients.reduce((acc, { statusCode }) => {
    const statusEntry = statusCodeMap.find(
      (entry) => entry.value === statusCode
    );
    if (statusEntry) {
      acc[statusEntry.label] = (acc[statusEntry.label] || 0) + 1;
    }
    return acc;
  }, {});

  // Format the result
  return statusCodeMap.map(({ label }) => ({
    label,
    value: (counts[label] || 0).toString(),
  }));
};

export const getLabelAndValue = (arr, labelKey, valueKey) => {
  return arr.map((item) => ({
    ...item,
    label: item[labelKey],
    value: item[valueKey]?.toString(),
  }));
};

// export const generateTransactionId = () => {
//   const timestamp = new Date().getTime();
//   const randomNum = Math.random().toString(36).substr(2, 5);
//   return `${timestamp}${randomNum}`;
// };

export const generateTransactionId = () => {
  const timestamp = new Date().getTime();
  const randomNum = randomBytes(4).toString("hex"); // Generates a random 8-character hex string
  return `${timestamp}${randomNum}`;
};

export const CurrencyFormatter = (value, currency) => {
  // Validate input
  if (typeof value !== "number" || isNaN(value)) {
    throw new Error("Value must be a valid number");
  }

  if (typeof currency !== "string" || currency.length !== 3) {
    throw new Error(
      "Currency must be a valid 3-letter currency code (e.g., 'NGN')"
    );
  }

  // Check if Intl is supported (client-side only)
  if (typeof Intl === "undefined" || !Intl.NumberFormat) {
    // Fallback for environments without Intl support (e.g., SSR)
    return `${currency} ${value.toFixed(2)}`;
  }

  // Format the value using Intl.NumberFormat
  const formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: currency,
  });

  return formatter.format(value);
};

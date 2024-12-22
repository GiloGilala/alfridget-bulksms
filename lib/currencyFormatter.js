export const CurrencyFormatter = (value, currency) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  });

  return formatter.format(value);
};

// Usage:
// console.log(format(1000, 'USD')); // USD
// console.log(format(1000, 'EUR')); // EUR
// console.log(format(1000, 'GBP')); // GBP
// console.log(format(1000, 'NGN')); // NGN
// console.log(format(1000, 'JPY')); // JPY
// console.log(format(1000, 'CNY')); // CNY
// console.log(format(1000, 'INR')); // INR

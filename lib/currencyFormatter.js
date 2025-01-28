export const CurrencyFormatter = (value = 0, currency) => {
  const formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: currency,
  });

  return formatter.format(value);
};

// Usage:
// console.log(CurrencyFormatter(1000, 'USD')); // USD
// console.log(CurrencyFormatter(1000, 'EUR')); // EUR
// console.log(CurrencyFormatter(1000, 'GBP')); // GBP
// console.log(CurrencyFormatter(1000, 'NGN')); // NGN
// console.log(CurrencyFormatter(1000, 'JPY')); // JPY
// console.log(CurrencyFormatter(1000, 'CNY')); // CNY
// console.log(CurrencyFormatter(1000, 'INR')); // INR

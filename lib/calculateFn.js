export const calculateStatusCounts = (recipients, statusCodeMap) => {
  const counts = {};

  // Initialize counts for each label in the statusCodeMap
  statusCodeMap.forEach(({ label }) => {
    counts[label] = 0;
  });

  // Count occurrences based on statusCode
  recipients.forEach(({ statusCode }) => {
    const statusEntry = statusCodeMap.find(
      (entry) => entry.value === statusCode
    );
    if (statusEntry) {
      counts[statusEntry.label]++;
    }
  });

  // Format the result
  return Object.entries(counts).map(([label, value]) => ({
    label,
    value: value > 0 ? value.toString() : "0",
  }));
};

export const getLabelAndValue = (arr, labelKey, valueKey) => {
  return arr.map((item) => ({
    ...item,
    label: item[labelKey],
    value: item[valueKey]?.toString(),
  }));
};

export const generateTransactionId = () => {
  const timestamp = new Date().getTime();
  const randomNum = Math.random().toString(36).substr(2, 5);
  return `${timestamp}${randomNum}`;
};

export const CurrencyFormatter = (value, currency) => {
  const formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: currency,
  });

  return formatter.format(value);
};

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

export const formatDate = (date: string): string => {
  const transactionDate = new Date(date);
  const formatDate = transactionDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const monthName = formatDate.split(',')[0];
  return `${transactionDate.getFullYear()} ${monthName}`;
};

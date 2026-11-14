export function validateExpiration(expiration) {
  if (!/^\d{2}\/\d{2}$/.test(expiration)) {
    return false;
  }

  const now = new Date();

  const currentYear = now.getFullYear();
  const currentMonth = 1 + now.getMonth();

  const parts = expiration.split("/");

  const enteredMonth = Number(parts[0]);
  const enteredYear = Number(parts[1]) + 2000;

  if (enteredMonth < 1 || enteredMonth > 12) {
    return false;
  }
  if (enteredYear < currentYear) {
    return false;
  }

  if (enteredYear === currentYear && enteredMonth < currentMonth) {
    return false;
  }

  return true;
}

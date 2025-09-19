/**
 * Validates an email address format
 * @param {string} email
 * @returns {boolean}
 */
export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

/**
 * Validates phone number (basic)
 * @param {string} phone
 * @returns {boolean}
 */
export function validatePhone(phone) {
  const re = /^\+?[0-9\s\-]{7,15}$/;
  return re.test(phone);
}

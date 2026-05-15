/** Parse comma-separated admin emails from env */
export function getAdminEmails() {
  const raw = import.meta.env.VITE_ADMIN_EMAILS || '';
  return raw
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email) {
  if (!email) return false;
  return getAdminEmails().includes(email.trim().toLowerCase());
}

export function getAdminSignupCode() {
  return (import.meta.env.VITE_ADMIN_SIGNUP_CODE || '').trim();
}

export function isAdminSignupCodeRequired() {
  return getAdminSignupCode().length > 0;
}

export function validateAdminSignupCode(code) {
  const expected = getAdminSignupCode();
  if (!expected) return true;
  return code.trim() === expected;
}

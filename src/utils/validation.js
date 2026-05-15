export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function validatePhone(phone) {
  return /^[+]?[\d\s-]{10,15}$/.test(phone.trim());
}

export function validateStep1(data) {
  const errors = {};
  if (!data.name?.trim()) errors.name = 'Full name is required';
  if (!data.email?.trim()) errors.email = 'Email is required';
  else if (!validateEmail(data.email)) errors.email = 'Enter a valid email';
  if (!data.phone?.trim()) errors.phone = 'Contact number is required';
  else if (!validatePhone(data.phone)) errors.phone = 'Enter a valid phone number';
  if (!data.dob) errors.dob = 'Date of birth is required';
  else {
    const dob = new Date(data.dob);
    const age = (Date.now() - dob.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
    if (age < 16) errors.dob = 'You must be at least 16 years old';
    if (age > 100) errors.dob = 'Please enter a valid date of birth';
  }
  return errors;
}

export function validateStep2(data) {
  const errors = {};
  if (!data.location?.trim()) errors.location = 'Location is required';
  if (!data.languages?.length) errors.languages = 'Select at least one language';
  if (!data.availability?.length) errors.availability = 'Select at least one weekday';
  return errors;
}

export function getInitials(name) {
  if (!name?.trim()) return '?';
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

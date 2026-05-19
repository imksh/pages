// Validate email
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate password
export const validatePassword = (password) => {
  return password && password.length >= 6;
};

// Validate URL
export const validateURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Validate required fields
export const validateRequired = (value) => {
  return value && value.toString().trim().length > 0;
};

// Validate phone number
export const validatePhone = (phone) => {
  const phoneRegex = /^[0-9\s\-\+\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

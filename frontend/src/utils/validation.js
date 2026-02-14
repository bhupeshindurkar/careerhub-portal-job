// Email validation
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation
export const isValidPassword = (password) => {
  return password.length >= 6;
};

// Phone validation (Indian format)
export const isValidPhone = (phone) => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
};

// URL validation
export const isValidURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Salary validation
export const isValidSalary = (min, max) => {
  return min > 0 && max > 0 && max >= min;
};

// Date validation (future date)
export const isFutureDate = (date) => {
  return new Date(date) > new Date();
};

// File validation
export const isValidFile = (file, maxSize = 5 * 1024 * 1024) => {
  if (!file) return false;
  
  const validTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  
  return validTypes.includes(file.type) && file.size <= maxSize;
};

// Image validation
export const isValidImage = (file, maxSize = 2 * 1024 * 1024) => {
  if (!file) return false;
  
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
  
  return validTypes.includes(file.type) && file.size <= maxSize;
};

// Form validation messages
export const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PASSWORD: 'Password must be at least 6 characters',
  INVALID_PHONE: 'Please enter a valid phone number',
  INVALID_URL: 'Please enter a valid URL',
  INVALID_SALARY: 'Maximum salary must be greater than minimum',
  INVALID_DATE: 'Please select a future date',
  INVALID_FILE: 'Please upload a valid PDF or DOC file (max 5MB)',
  INVALID_IMAGE: 'Please upload a valid image file (max 2MB)',
  PASSWORD_MISMATCH: 'Passwords do not match'
};

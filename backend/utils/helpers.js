// Format date
exports.formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Calculate days ago
exports.daysAgo = (date) => {
  const now = new Date();
  const posted = new Date(date);
  const diffTime = Math.abs(now - posted);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return `${Math.floor(diffDays / 30)} months ago`;
};

// Validate email
exports.isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Generate random string
exports.generateRandomString = (length = 10) => {
  return Math.random().toString(36).substring(2, length + 2);
};

// Sanitize user input
exports.sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input.trim().replace(/[<>]/g, '');
};

// Calculate profile completion
exports.calculateProfileCompletion = (user) => {
  let completion = 0;
  const fields = [
    'name', 'email', 'phone', 'location', 'skills',
    'education', 'experience', 'resume', 'profilePicture'
  ];
  
  fields.forEach(field => {
    if (user[field] && (Array.isArray(user[field]) ? user[field].length > 0 : true)) {
      completion += 100 / fields.length;
    }
  });
  
  return Math.round(completion);
};

// Error response
exports.errorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({
    status: 'error',
    message
  });
};

// Success response
exports.successResponse = (res, data, message = 'Success') => {
  return res.status(200).json({
    status: 'success',
    message,
    data
  });
};

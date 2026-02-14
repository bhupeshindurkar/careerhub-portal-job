// Google OAuth Configuration
export const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID';

// Initialize Google OAuth
export const initGoogleAuth = () => {
  return new Promise((resolve, reject) => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: resolve,
      });
    } else {
      reject(new Error('Google API not loaded'));
    }
  });
};

// Handle Google Login Response
export const handleGoogleResponse = async (response) => {
  try {
    // Decode JWT token from Google
    const base64Url = response.credential.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    const userData = JSON.parse(jsonPayload);

    return {
      email: userData.email,
      name: userData.name,
      googleId: userData.sub,
      profilePicture: userData.picture,
    };
  } catch (error) {
    console.error('Error decoding Google response:', error);
    throw error;
  }
};

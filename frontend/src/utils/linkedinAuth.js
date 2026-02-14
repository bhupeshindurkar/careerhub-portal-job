/**
 * LinkedIn OAuth Helper
 * Developed by: BHUPESH INDURKAR - Full Stack Developer
 */

const LINKEDIN_CLIENT_ID = process.env.REACT_APP_LINKEDIN_CLIENT_ID || 'your_linkedin_client_id';
const REDIRECT_URI = process.env.REACT_APP_LINKEDIN_REDIRECT_URI || 'http://localhost:3000/auth/linkedin/callback';

/**
 * Initialize LinkedIn OAuth
 */
export const initLinkedInAuth = () => {
  const scope = 'r_liteprofile r_emailaddress';
  const state = Math.random().toString(36).substring(7);
  
  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&state=${state}&scope=${encodeURIComponent(scope)}`;
  
  return authUrl;
};

/**
 * Handle LinkedIn OAuth Callback
 */
export const handleLinkedInCallback = async (code) => {
  try {
    // Exchange code for access token
    const tokenResponse = await fetch('/api/auth/linkedin/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });

    const tokenData = await tokenResponse.json();
    
    if (tokenData.status === 'success') {
      return tokenData;
    } else {
      throw new Error(tokenData.message || 'LinkedIn authentication failed');
    }
  } catch (error) {
    console.error('LinkedIn callback error:', error);
    throw error;
  }
};

/**
 * Get LinkedIn User Profile
 */
export const getLinkedInProfile = async (accessToken) => {
  try {
    const response = await fetch('https://api.linkedin.com/v2/me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    const profile = await response.json();
    return profile;
  } catch (error) {
    console.error('Error fetching LinkedIn profile:', error);
    throw error;
  }
};

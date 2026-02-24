# Contact Form Email Feature

## Feature Overview
Contact page se jab koi user message bhejega, tumhe automatically email aayega tumhare Gmail pe: `bhupeshindurkar6@gmail.com`

## How It Works

### User Flow:
1. User Contact page pe jata hai
2. Form fill karta hai (Name, Email, Subject, Message)
3. "Send Message" button click karta hai
4. User ko confirmation message dikhta hai
5. User ko confirmation email milta hai

### Admin Flow (Tumhare liye):
1. Tumhe email aayega: `bhupeshindurkar6@gmail.com`
2. Email me user ka pura message hoga:
   - User ka naam
   - User ka email
   - Subject
   - Message
   - Date & Time
3. Direct reply link hoga email me
4. Tum directly user ko reply kar sakte ho

## Email Templates

### 1. Admin Email (Tumhare liye)
```
Subject: Contact Form: [User's Subject]

From: [User Name]
Email: [User Email]
Subject: [Subject]
Date: [Date & Time]

Message:
[User's full message]

Quick Reply: [Click to reply directly]
```

### 2. User Confirmation Email
```
Subject: Thank you for contacting CareerHub Pro

Hi [User Name],

Thank you for reaching out! We have received your message 
and will get back to you within 24 hours.

Best regards,
CareerHub Pro Team
Developed by BHUPESH INDURKAR
```

## Technical Implementation

### Backend Files Created:
1. `backend/controllers/contactController.js` - Contact form logic
2. `backend/routes/contact.js` - Contact API route
3. `backend/utils/emailService.js` - Email templates added

### Frontend Files Created:
1. `frontend/src/redux/services/contactService.js` - API service
2. `frontend/src/pages/general/Contact.jsx` - Updated with API integration

### API Endpoint:
```
POST /api/contact
Body: {
  name: string,
  email: string,
  subject: string,
  message: string
}
```

## Environment Variables

Backend `.env` file me add karo:
```
ADMIN_EMAIL=bhupeshindurkar6@gmail.com
```

## Testing Steps

1. **Local Testing:**
   ```bash
   # Backend start karo
   cd backend
   npm start
   
   # Frontend start karo (new terminal)
   cd frontend
   npm start
   ```

2. **Test Contact Form:**
   - Go to: http://localhost:3000/contact
   - Fill form with test data
   - Click "Send Message"
   - Check success message
   - Check your Gmail: bhupeshindurkar6@gmail.com

3. **Production Testing:**
   - Go to: https://careerhub-portal-job.vercel.app/contact
   - Fill form
   - Submit
   - Check Gmail

## Email Configuration

Make sure backend `.env` has email settings:
```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_specific_password
ADMIN_EMAIL=bhupeshindurkar6@gmail.com
```

## Features

✅ User sends message from contact form
✅ Admin receives email notification
✅ User receives confirmation email
✅ Professional email templates
✅ Direct reply link in admin email
✅ Form validation
✅ Loading state during submission
✅ Error handling
✅ Success/Error toast notifications

## Deployment

### Frontend (Vercel):
- Automatically deployed from GitHub
- URL: https://careerhub-portal-job.vercel.app

### Backend (Render):
1. Go to: https://dashboard.render.com/
2. Select your backend service
3. Click "Manual Deploy"
4. Add environment variable: `ADMIN_EMAIL=bhupeshindurkar6@gmail.com`
5. Wait for deployment

## Email Preview

### Admin Email Look:
```
┌─────────────────────────────────────┐
│   📧 New Contact Form Submission    │
├─────────────────────────────────────┤
│                                     │
│ From: John Doe                      │
│ Email: john@example.com             │
│ Subject: Job Posting Question       │
│ Date: Feb 25, 2026, 10:30 AM       │
│                                     │
│ Message:                            │
│ ┌─────────────────────────────────┐ │
│ │ Hi, I want to know how to post  │ │
│ │ a job on your platform...       │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Quick Reply: [Click to reply]       │
│                                     │
└─────────────────────────────────────┘
```

## Next Steps

1. ✅ Code pushed to GitHub
2. ⏳ Wait for Vercel deployment (2-3 min)
3. ⏳ Deploy backend to Render
4. ⏳ Add `ADMIN_EMAIL` env variable on Render
5. ✅ Test contact form
6. ✅ Check Gmail for test email

---

**Developer**: BHUPESH INDURKAR
**Email**: bhupeshindurkar6@gmail.com
**Date**: February 25, 2026

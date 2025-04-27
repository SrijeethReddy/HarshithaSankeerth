# Royal Wedding RSVP Website

A beautiful, royal-themed RSVP website for a wedding with multiple events. The website allows guests to RSVP for different events and stores responses in Firebase Realtime Database.

## Features

- Elegant royal design with gold and navy color scheme
- Responsive layout using Bootstrap 5
- RSVP form for multiple events
- Real-time countdown to the wedding
- Firebase Realtime Database integration
- Form validation and error handling
- Success confirmation modal
- Mobile-friendly design

## Setup Instructions

### 1. Firebase Setup

1. Create a Firebase project:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Add project"
   - Follow the setup wizard

2. Enable Realtime Database:
   - In your Firebase project, go to "Realtime Database"
   - Click "Create Database"
   - Choose a location and start in test mode

3. Get Firebase Configuration:
   - Go to Project Settings (gear icon)
   - Under "Your apps", click the web icon (</>)
   - Register your app and copy the configuration object

4. Update Firebase Config:
   - Open `script.js`
   - Replace the `firebaseConfig` object with your configuration

5. Set Database Rules:
   - Go to Realtime Database > Rules
   - Update the rules to:
     ```json
     {
       "rules": {
         "rsvps": {
           ".read": false,
           ".write": true
         }
       }
     }
     ```

### 2. Local Testing

1. Install a local server (if you don't have one):
   ```bash
   npm install -g serve
   ```

2. Run the server:
   ```bash
   serve
   ```

3. Open `http://localhost:3000` in your browser

### 3. GitHub Pages Deployment

1. Create a new GitHub repository

2. Initialize and push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

3. Enable GitHub Pages:
   - Go to your repository settings
   - Scroll to "GitHub Pages"
   - Under "Source", select "main" branch
   - Click "Save"

4. Your website will be available at:
   `https://YOUR_USERNAME.github.io/YOUR_REPO/`

## File Structure

- `index.html` - Homepage with event overview
- `rsvp.html` - RSVP form page
- `styles.css` - Custom styles
- `script.js` - Form logic and Firebase integration

## Customization

- Update event details in `index.html`
- Modify colors in `styles.css` (CSS variables)
- Adjust form fields in `rsvp.html`
- Update Firebase configuration in `script.js`

## Security Notes

- The Firebase database is set to allow writes but restrict reads
- Consider implementing additional security measures for production
- Regularly backup your Firebase data

## Support

For any issues or questions, please contact the website administrator. 
# Gruuv Web App

A modern React web application for tracking daily achievements and progress, migrated from the original Android app.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set up Firebase
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use your existing Gruuv project
3. Add a web app to your project
4. Copy the Firebase configuration
5. Create a `.env.local` file in the root directory with your Firebase config:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORING_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 3. Set up Firestore Database
1. In Firebase Console, go to Firestore Database
2. Create database in production mode
3. Set up the following security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /achievements/{document} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app!

## 📱 Features

- ✅ User Authentication (Firebase Auth)
- ✅ Add/Edit/Delete Achievements
- ✅ Track Effort Levels (0-10 scale)
- ✅ Progress Visualization with Charts
- ✅ Responsive Design
- ✅ Material-UI Components
- ✅ Real-time Data Sync

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js app router pages
├── components/             # Reusable UI components
│   └── layout/            # Layout components
├── context/               # React Context providers
├── pages/                 # Page components
│   ├── auth/             # Authentication pages
│   ├── dashboard/        # Dashboard page
│   ├── graph/            # Progress charts
│   └── quest/            # Quest functionality
├── services/             # External services (Firebase)
├── theme/                # Material-UI theme
└── types/                # TypeScript type definitions
```

## 🎨 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **UI Library**: Material-UI (MUI)
- **Styling**: Material-UI + Tailwind CSS
- **State Management**: React Context API
- **Backend**: Firebase (Auth + Firestore)
- **Charts**: Recharts
- **Deployment**: Vercel (recommended)

## 🚀 Deployment

### Deploy to Vercel
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy!

### Custom Domain
1. In Vercel dashboard, go to your project settings
2. Add your custom domain
3. Update DNS records as instructed

## 🔄 Migration from Android

This web app maintains the same core functionality as your Android app:

| Android Feature | Web Equivalent |
|----------------|----------------|
| Jetpack Compose | React Components |
| ViewModels | React Context |
| Navigation Compose | Next.js App Router |
| Firebase Android SDK | Firebase Web SDK |
| MPAndroidChart | Recharts |
| Material Design 3 | Material-UI |

## 📈 Next Steps

- [ ] Add offline support with Service Workers
- [ ] Implement push notifications
- [ ] Add more chart types
- [ ] Create React Native version
- [ ] Add social features
- [ ] Implement data export

## 🤝 Contributing

This is a personal project, but feel free to suggest improvements!

## 📄 License

Private project - All rights reserved.
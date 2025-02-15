# SkillStack

## Overview
SkillStack is an innovative online learning platform designed to help users stay focused and motivated while completing courses. Unlike YouTube, where distractions are prevalent, SkillStack ensures that users complete courses without skipping any content. By using the YouTube API to fetch courses and integrating OAuth authentication, SkillStack provides a unique environment where users can track their progress and are encouraged to complete courses fully. 

---

## Features

- **Course Enrollment & Progress Tracking**  
  Users can browse available courses fetched from YouTube and enroll. Their progress is tracked, and they cannot skip any part of the video until it's fully watched.
  
- **OAuth Authentication**  
  Secure Google OAuth login to access personalized features like course enrollment and progress tracking.
  
- **Motivation to Complete**  
  Unlike traditional platforms, SkillStack eliminates distractions and ensures users focus on completing courses from start to finish.

- **MongoDB Backend**  
  User data, course enrollments, and progress are stored securely in MongoDB, with interactions managed via Prisma.

- **No Distractions**  
  The platform removes distractions often found on YouTube, like related videos or ads, creating a focused learning environment.

---

## Technologies Used

| **Tech Stack**         | **Details**                                              |
|------------------------|----------------------------------------------------------|
| **Frontend**           | Next.js, React.js, Tailwind CSS                          |
| **Backend**            | MongoDB, Prisma ORM                                      |
| **Authentication**     | NextAuth.js (Google OAuth)                               |
| **API Integration**    | YouTube Data API                                         |
| **Database**           | MongoDB (via Prisma ORM)                                 |

---

## Architecture

- **Frontend - Next.js**  
  Users interact with the platform via a responsive UI built with Next.js and styled with Tailwind CSS.
  
- **Backend - MongoDB & Prisma**  
  The backend is powered by MongoDB and Prisma, storing all user-related data like courses enrolled, progress, and course completion status.
  
- **YouTube API**  
  The platform fetches courses directly from YouTube, ensuring users have access to a wide range of educational videos.

---

## Setup Instructions

### 🚀 Prerequisites
Ensure you have the following tools installed:
- Node.js (v14+)
- MongoDB instance (either local or cloud)

### 💻 Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/harshj3915/SkillStack.git
   cd youlearn
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root of the project with the following:

   ```
   DATABASE_URL=your-database
   NEXTAUTH_URL=http://localhost:3000
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

4. Run Prisma migrations:
   ```bash
   npx prisma migrate dev
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.

---

## Key Functionalities

### 🧑‍🏫 Course Enrollment & Progress Tracking
- Browse through YouTube-sourced courses.
- Enroll in courses and track your progress. The platform ensures you cannot skip any part of the video.
- But you can rewind and watch the already watched content without any restrictions.

### 🔐 Authentication
- Sign in with your Google account using OAuth authentication via NextAuth.js.

### 📊 Course Completion
- Once you’ve watched the full video, the course will be marked as complete, and progress is updated accordingly.

---

## How to Use

1. **Login**  
   Sign in with your Google account to access personalized features.

2. **Enroll in Courses**  
   Browse the available courses from YouTube and click to enroll. 

3. **Track Your Progress**  
   Watch videos from start to finish without skipping any part, ensuring that you complete the course fully.

4. **Complete a Course**  
   Once you finish watching the entire video, the course will be marked as completed.

---

## Challenges & Solutions

### 🚧 Challenges
- Preventing users from skipping content during videos.
- Ensuring course progress is tracked accurately.

### ✅ Solutions
- Created a custom video player that prevents skipping and ensures users watch the entire video.
- Integrated MongoDB to track course enrollment and progress data for each user.

---

## Potential Impact

- **For Individuals**: SkillStack ensures that users focus and complete courses, leading to improved learning outcomes.
  
- **For Educational Platforms**: SkillStack promotes a focused and distraction-free learning environment, making it easier for learners to progress and complete courses.

---

## Future Enhancements

- Support for more video platforms besides YouTube.
- Enhanced analytics for tracking course progress and completion rates.
- Gamification to further motivate users to complete courses.

---

## Contact

For inquiries or collaboration:
- 📧 Email: [hjain3915@gmail.com]
- 🌐 Website: [theskillstack.vercel.app]

---

Feel free to modify the details according to your actual project specifics, and ensure your links (like the email or website) are accurate before sharing.

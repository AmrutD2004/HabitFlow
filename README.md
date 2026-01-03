📌 Habit Tracker Application **HabitFlow**

This project is a full-stack Habit Tracker application designed to help users build and maintain daily habits with structured reminders and progress tracking. The system focuses on reliability, clean data modeling, and realistic notification behavior.


**🔧 Key Features**

**Habit Management**

Create, edit, delete habits

Set habit title, description, category, repeat days, and reminder time

Support for multiple habits per user

Repeat Day Scheduling

Habit repeat days are stored in a normalized table

Supports flexible schedules such as weekdays.

UI reflects habit activity only on scheduled days


**Daily Habit Tracking**
Track habit completion on a per-day basis

Prevents duplicate tracking entries per habit per date

Ensures completed habits do not trigger reminders


**In-App Notification System**
Background reminders implemented using node-cron

Notifications are generated at each habit’s reminder time

Only one notification per habit per day

Notifications are skipped if the habit is already completed


**Notification UX**
Notification bell with unread indicator

Notifications are marked as read when opened

Read notifications are removed from the UI

Empty-state message shown when no notifications exist


**Authentication**
Secure user authentication using JWT

HTTP-only cookies for session management

Protected routes for user-specific data


**🛠 Tech Stack**
Frontend: React, Tailwind CSS

Backend: Node.js, Express.js

Database: PostgreSQL

Background Jobs: node-cron

Auth: JWT, bcrypt


**📐 Architecture Highlights**

Normalized database schema for habits and repeat days

Server-side cron jobs for accurate reminder scheduling

Defensive logic to avoid duplicate notifications

Clear separation between tracking, reminders, and notifications

This project emphasizes real-world backend behavior, reliable scheduling, and user-friendly notification handling.

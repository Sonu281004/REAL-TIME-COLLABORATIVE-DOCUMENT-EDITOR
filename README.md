# 📝 Real-Time Collaborative Document Editor

This is a web-based real-time collaborative document editor where multiple users can edit the same document at the same time. It uses WebSockets to sync changes instantly between users.

---

## 🚀 Features

- Real-time document editing
- Multiple users can collaborate simultaneously
- Room-based collaboration using room IDs
- Live synchronization with Socket.IO
- Simple and responsive user interface

---

## 🛠 Tech Stack

**Frontend**
- React.js
- Vite
- HTML
- CSS
- JavaScript

**Backend**
- Node.js
- Socket.IO

---

## ⚙️ Installation & Setup

### Step 1: Clone the repository
```bash
git clone https://github.com/Sonu281004/REAL-TIME-COLLABORATIVE-DOCUMENT-EDITOR.git 
```
## Step 2: Go to project folder
```bash
cd REAL-TIME-COLLABORATIVE-DOCUMENT-EDITOR
```
## Step 3: Start Backend
```bash
cd server
npm install
npm start
```
Backend will run on:
```bash
http://localhost:5000
```
## Step 4: Start Frontend
```bash
cd client
npm install
npm run dev
```
Frontend will run on:
```bash
http://localhost:5173
```
## 📖 How It Works

- Users join a room using a room ID
- Any change made by one user is instantly reflected for all users
- Socket.IO handles real-time communication
- React handles UI updates

## 🎯 Use Cases

- Real-time document editing
- Online collaboration
- Team projects
- Learning purpose

## 👤 Author

Soni Kannoujiya
GitHub: https://github.com/Sonu281004






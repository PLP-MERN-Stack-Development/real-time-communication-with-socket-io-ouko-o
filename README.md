# Real-Time Chat Application with Socket.io

This assignment focuses on building a real-time chat application using Socket.io, implementing bidirectional communication between clients and server.

## Assignment Overview

You will build a chat application with the following features:
1. Real-time messaging using Socket.io
2. User authentication and presence
3. Multiple chat rooms or private messaging
4. Real-time notifications
5. Advanced features like typing indicators and read receipts

## Project Structure

```
socketio-chat/
├── client/                 # React front-end
│   ├── public/             # Static files
│   ├── src/                # React source code
│   │   ├── components/     # UI components
│   │   ├── context/        # React context providers
│   │   ├── hooks/          # Custom React hooks
│   │   ├── pages/          # Page components
│   │   ├── socket/         # Socket.io client setup
│   │   └── App.jsx         # Main application component
│   └── package.json        # Client dependencies
├── server/                 # Node.js back-end
│   ├── config/             # Configuration files
│   ├── controllers/        # Socket event handlers
│   ├── models/             # Data models
│   ├── socket/             # Socket.io server setup
│   ├── utils/              # Utility functions
│   ├── server.js           # Main server file
│   └── package.json        # Server dependencies
└── README.md               # Project documentation
```

## Getting Started

1. Accept the GitHub Classroom assignment invitation
2. Clone your personal repository that was created by GitHub Classroom
3. Follow the setup instructions in the `Week5-Assignment.md` file
4. Complete the tasks outlined in the assignment

## Files Included

- `Week5-Assignment.md`: Detailed assignment instructions
- Starter code for both client and server:
  - Basic project structure
  - Socket.io configuration templates
  - Sample components for the chat interface

## Requirements

- Node.js (v18 or higher)
- npm or yarn
- Modern web browser
- Basic understanding of React and Express

## Submission

Your work will be automatically submitted when you push to your GitHub Classroom repository. Make sure to:

1. Complete both the client and server portions of the application
2. Implement the core chat functionality
3. Add at least 3 advanced features
4. Document your setup process and features in the README.md
5. Include screenshots or GIFs of your working application
6. Optional: Deploy your application and add the URLs to your README.md

## Resources

- [Socket.io Documentation](https://socket.io/docs/v4/)
- [React Documentation](https://react.dev/)
- [Express.js Documentation](https://expressjs.com/)
- [Building a Chat Application with Socket.io](https://socket.io/get-started/chat) 

## Setup

1. Requirements: Node.js v18+
2. Install dependencies:
   - Server
     ```
     cd server
     npm install
     npm run dev
     ```
   - Client
     ```
     cd ../client
     npm install
     npm run dev
     ```
3. Environment:
   - Client uses `VITE_SOCKET_URL` (defaults to `http://localhost:5000`).
   - Server uses `CLIENT_URL` (defaults to `http://localhost:5173`).

## Features Implemented

- Real-time global chat with Socket.io
- Presence: online/offline and user list
- Typing indicators
- Direct messages (private messaging)
- Read receipts (basic: emits on receive/visible)
- Browser notifications for new messages when tab unfocused
- Rooms API (join/leave/send) with basic history per room

## How to Use

1. Open client at `http://localhost:5173`, choose a username.
2. Chat in the global room or select a user from the sidebar to send a DM.
3. Typing indicator shows who is typing; unread/read events are emitted automatically.
4. Optional: implement a small UI to join a room via `joinRoom(room)` from the socket hook.

## Notes

- This is a learning-oriented implementation. Production apps should persist users/messages and secure auth (JWT/OAuth). Read receipts typically attach per-user state server-side and only dispatch when message is actually seen.
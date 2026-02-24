# My Fullstack App

A full-stack application with **React frontend** and **Node.js backend**. The project is structured so that the frontend 
and backend run on separate ports during development but can be started together with a single command.  

React-Project/
├── backend/ # Node.js API
│ ├── package.json
│ └── server.js
├── frontend/ # React App
│ ├── package.json
│ └── src/
├── package.json # Root package.json for running both frontend & backend
└── README.md

## **Setup & Run**

1. **Clone the repository**

```bash
git clone https://github.com/Pranav25-06/React-Project.git
cd React-Project
npm run setup
npm run start
```
THis will run the backend on port 3000 and frontend on port 5173



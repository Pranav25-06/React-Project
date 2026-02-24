import { useState } from 'react'


import Navbar from './Navbar'
import { BrowserRouter } from 'react-router-dom'
import { Route,Routes } from 'react-router-dom'
import "./App.css"

import Login from './Login'
import SignUp from './Signup'
import Home from './Home'
import Dashboard from './Dashboard'
import Contact from './Contact'
import About from './About'
import Users from './Users'
import UserDetails from './User'
import MyDetails from './myDetails'
import EditProfile from './EditProfile'
import UpdatePassword from './UpdatePass'


function App() {
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [users,setUsers] = useState([]);
  const [isAdmin,setIsAdmin] = useState(false);

 
  return (
    <>
    <div className="content-wrapper">
  {/* All Users component content here */}
</div>
    <BrowserRouter>
    <Navbar setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} username={user.full_name}/>
    <Routes>
          <Route path="/" element={<Dashboard setUsers={setUsers} isAuthenticated={isAuthenticated}/>} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setUser={setUser} setIsAdmin={setIsAdmin}/>} />
          <Route path="/signup" element={<SignUp setUser={setUser} setIsAuthenticated={setIsAuthenticated}/>} />
          <Route path="/dashboard" element={<Dashboard setUsers={setUsers}/>} />
          <Route path="/contact" element={<Contact isAuthenticated={isAuthenticated}/>} />
          <Route path="/about" element={<About isAuthenticated={isAuthenticated}/>} />
          <Route path="/user" element={<UserDetails user={user} isAuthenticated={isAuthenticated}/>} />
           <Route path="/users" element={<Users users={users} isAuthenticated={isAuthenticated} isAdmin={isAdmin} setUsers={setUsers}/>} />
            <Route path="/mydetails" element={<MyDetails user={user} isAuthenticated={isAuthenticated}/>} />
          <Route path="/editprofile" element={<EditProfile user={user} setUser={setUser} isAuthenticated={isAuthenticated}/>} />
          <Route path="/updatepass" element={<UpdatePassword user={user} setUser={setUser} isAuthenticated={isAuthenticated}/>} />

           
    </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App

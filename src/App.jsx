
import './App.css'
import { Routes, Route } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useContext } from 'react';

import Home from './Pages/Home'
import TaskDetail from './Pages/TaskDetail'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Footer from './Components/Footer'
import CompletedTasks from './Pages/CompletedTasks';
import { TokenAuthContext } from './Context Api/AuthContext';
import ImportantTasks from './Pages/ImportantTasks';

function App() {

  const { authStatus, setAuthStatus } = useContext(TokenAuthContext)

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/completed' element={authStatus?<CompletedTasks />:<Home />} />
        <Route path='/important' element={authStatus?<ImportantTasks />:<Home />} />
        <Route path='/detail/:tid' element={authStatus?<TaskDetail />:<Home />} />
        <Route path='/reg' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
      <Footer />
      <ToastContainer/>
    </>
  )
}

export default App

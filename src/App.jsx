
import './App.css'
import { Routes, Route } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import Home from './Pages/Home'
import TaskDetail from './Pages/TaskDetail'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Footer from './Components/Footer'
import CompletedTasks from './Pages/CompletedTasks';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/completed' element={<CompletedTasks />} />
        <Route path='/detail/:tid' element={<TaskDetail />} />
        <Route path='/reg' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
      <Footer />
      <ToastContainer/>
    </>
  )
}

export default App

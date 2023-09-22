import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Habits from './pages/Habits'
import Goals from './pages/Goals'
//import Header from './components/Header'

import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {logout, resetAuth} from './features/auth/authSlice'
import {resetGoals} from './features/goals/goalsSlice'
import { resetHabits } from './features/habits/habitsSlice'


function Header() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.auth)

  const onLogout = () => {
      dispatch(logout())
      dispatch(resetAuth())
      dispatch(resetGoals())
      dispatch(resetHabits())
      navigate('/')
  }

  //console.log(user)

  return (
      <header className='header'>
          <div className='logo'>
              <Link to='/'>CarAIbou</Link>
          </div>
          <ul>
              {user ? (<li>
                  <button onClick={onLogout}>
                      <FaSignOutAlt /> Logout
                  </button>
              </li>) : (<>
                  <li>
                      <Link to='/login'>
                          <FaSignInAlt /> Login
                      </Link>
                  </li>
                  <li>
                      <Link to='/register'>
                          <FaUser /> Register
                      </Link>
                  </li>
              </>)}
          </ul>
      </header>
  )
}


function App() {
  return (
    <>
      <Router>
        <div className='container'>
        <Header />
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/habits' element={<Habits />} />
            <Route path='/goals' element={<Goals />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;

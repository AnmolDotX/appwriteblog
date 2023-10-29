import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import loader from './assets/loader.svg'
import {Header, Footer} from './components'
import { Outlet } from 'react-router-dom';

const App = () => {

  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData) => {
      if(userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .catch((error)=>console.log(error))
    .finally(()=>setIsLoading(false))
  },[])


  return isLoading ? (
    <div className='flex items-center justify-center max-h-screen'>
      <img className='text-4xl' src={loader} alt="content loading ..." />
    </div>
  ) : (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
          <main>
            <Outlet />
          </main>
        <Footer />
        
      </div>
    </div>
  )
}

export default App
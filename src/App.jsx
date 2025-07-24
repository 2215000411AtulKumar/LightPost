import { useState, useEffect } from 'react';
import { Header, Footer } from './components/index';
import {Outlet} from 'react-router-dom';
import {login, logout} from './store/authSlice';
import authServices from './appwrite/auth';
import { useDispatch } from 'react-redux';

import './App.css'

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch  = useDispatch();

  useEffect(() => {
    authServices.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

return !loading ? (
  <div className='min-h-screen flex flex-col bg-gray-400'>
      <Header />
      <main className='flex-grow flex justify-center item-center'>
        <Outlet />
      </main>
      <Footer />
    </div>
) : null;
}

export default App

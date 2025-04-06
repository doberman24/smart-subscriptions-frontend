import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Analitics from '@/pages/Analitics/Analitics';
import Dashboard from '@/pages/Dashboard/Dashboard';
import Landing from '@/pages/Landing/Landing';
import Login from '@/pages/Login/Login';
import Settings from '@/pages/Settings/Settings';
import Subscriptions from '@/pages/Subscriptions/Subscriptions';
import styles from './App.module.css';


function App() {
  return (
    <BrowserRouter>
      <main className='container'>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/analitics' element={<Analitics />} />
          <Route path='/subscriptions' element={<Subscriptions />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App;

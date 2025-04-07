import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Analitics from '@/pages/Analitics/Analitics';
import Dashboard from '@/pages/Dashboard/Dashboard';
import Landing from '@/pages/Landing/Landing';
import Login from '@/pages/Login/Login';
import Settings from '@/pages/Settings/Settings';
import Subscriptions from '@/pages/Subscriptions/Subscriptions';
import HeaderLayout from '@/layouts/HeaderLayout';


function App() {
  return (
    <BrowserRouter>
      <main className='container'>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route element={<HeaderLayout />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/analitics' element={<Analitics />} />
            <Route path='/subscriptions' element={<Subscriptions />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='/login' element={<Login />} />
          </Route>
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App;

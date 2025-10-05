import { Routes, Route } from 'react-router-dom';

import Analitics from '@/pages/Analitics/Analitics';
import Dashboard from '@/pages/Dashboard/Dashboard';
import Landing from '@/pages/Landing/Landing';
import Login from '@/pages/Login/Login';
import Settings from '@/pages/Settings/Settings';
import Subscriptions from '@/pages/Subscriptions/Subscriptions';
import HeaderFooterLayout from '@/layouts/HeaderFooterLayout';
import PrivacyPolicy from '@/pages/PrivacyPolicy/PrivacyPolicy';
import VerifyEmail from '@/pages/VerifyEmail/VerifyEmail';
import Error404 from '@/pages/ErrorsPages/Error404';
import Error500 from '@/pages/ErrorsPages/Error500';
import Error400 from '@/pages/ErrorsPages/Error400';
import Error401 from '@/pages/ErrorsPages/Error401';
import Error403 from '@/pages/ErrorsPages/Error403';
import InfoVerifyEmail from '@/pages/VerifyEmail/InfoVeryfyEmail';

function App() {
  return (
    <main className='container'>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route element={<HeaderFooterLayout />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/analitics' element={<Analitics />} />
          <Route path='/subscriptions' element={<Subscriptions />} />
          <Route path='/settings' element={<Settings />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/politics' element={<PrivacyPolicy />} />
        <Route path='/verify-email' element={<VerifyEmail />} />
        <Route path='/info-verify' element={<InfoVerifyEmail />} />
        <Route path='/400' element={<Error400 />} />
        <Route path='/401' element={<Error401 />} />
        <Route path='/403' element={<Error403 />} />
        <Route path='/500' element={<Error500 />} />
        <Route path='*' element={<Error404 />} />
      </Routes>
    </main>
  )
}

export default App;

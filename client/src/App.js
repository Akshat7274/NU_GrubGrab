import './App.css';
import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import Nescafe from './pages/nescafe/Nescafe';
import ApnoGaon from './pages/apno-gaon/ApnoGaon';
import TMP from './pages/tmp/TMP';
import SilverSpoon from './pages/silver-spoon/SilverSpoon';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/nescafe' element={<Nescafe />} />
        <Route path='/apno-gaon' element={<ApnoGaon />} />
        <Route path='/tmp' element={<TMP />} />
        <Route path='/silver-spoon' element={<SilverSpoon />} />
      </Routes>
    </>
  );
}

export default App;

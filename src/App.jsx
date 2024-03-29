import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn.tsx';
import Home from './pages/Home.jsx';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<Home name={'admin'}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

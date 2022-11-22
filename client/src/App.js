import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './compoents/Login';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Register from './compoents/Register';
import Deshbooard from './compoents/Dashbooard';

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route index element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/deshboard' element={<Deshbooard/>} />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

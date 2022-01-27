import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Homepage from './views/Homepage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CompanyDetail from './views/CompanyDetail';
import Favorites from './views/Favorites'

function App() {
  return (
    <>
      <div className='App'>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Homepage />}></Route>
            <Route exact path="/:company" element={<CompanyDetail />}></Route>
            <Route exact path="/favorites" element={<Favorites />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;

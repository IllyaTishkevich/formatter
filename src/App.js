
import './App.css';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ConverterPage from './pages/ConverterPage'

function App() {
  return (
      <div className="App">
          <Header />
              <BrowserRouter>
                  <Routes>
                      <Route path="/:input?/:output?" element={<ConverterPage />} />
                  </Routes>
              </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;

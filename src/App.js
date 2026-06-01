
import './App.css';
import Header from './components/Header';
import Message from "./components/Message";
import Footer from './components/Footer';

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ConverterPage from './pages/ConverterPage'

function App() {
  return (
      <div className="App">
          <BrowserRouter>
              <Header />
              <Message />
              <Routes>
                  <Route path="/:input?/:output?" element={<ConverterPage />} />
              </Routes>
              <Footer />
          </BrowserRouter>
    </div>
  );
}

export default App;

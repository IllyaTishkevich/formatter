
import './App.css';
import Header from './components/Header';
import Message from "./components/Message";
import Footer from './components/Footer';
import { HelmetProvider } from "react-helmet-async"

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ConverterPage from './pages/ConverterPage'

function App() {
  return (
      <HelmetProvider>
          <BrowserRouter>
              <Header />
              <Message />
              <Routes>
                  <Route path="/:input?/:output?" element={<ConverterPage />} />
              </Routes>
              <Footer />
          </BrowserRouter>
      </HelmetProvider>
  );
}

export default App;

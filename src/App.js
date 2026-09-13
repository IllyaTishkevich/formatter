
import './App.css';
import Header from './components/Header';
import Message from "./components/Message";
import Footer from './components/Footer';
import { HelmetProvider } from "react-helmet-async"

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ConverterPage from './pages/ConverterPage'
import FormatterPage from "./pages/FormatterPage"
import PrivacyPolicy from './pages/PrivacyPolicy'
import Sitemap from "./pages/Sitemap";
import Include from "./pages/Include";
import ToolQuery from "./pages/Tool/Query";

function App() {
  return (
      <HelmetProvider>
          <BrowserRouter>
              <Header />
              <Message />
              <Routes>
                  <Route path="/policy" element={<PrivacyPolicy />} />
                  <Route path="/tool/query" element={<ToolQuery />} />
                  <Route path="/:input/:output" element={<ConverterPage />} />
                  <Route path="/:input" element={<FormatterPage />} />
                  <Route path="/sitemap" element={<Sitemap />} />
                  <Route path="/include" element={<Include />} />
                  <Route path="/" element={<FormatterPage />} />
              </Routes>
              <Footer />
          </BrowserRouter>
      </HelmetProvider>
  );
}

export default App;

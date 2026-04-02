import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx';
import GenericPage from './pages/GenericPage/GenericPage.jsx';
import Story from './pages/Story/Story.jsx';
import Ingredients from './pages/Ingredients/Ingredients.jsx';
import About from './pages/About/About.jsx';
import Contact from './pages/Contact/Contact.jsx';

// Generate static content for minimal inner pages
const DummyContent = ({ text }) => <p>{text}</p>;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          
          {/* Explore Links */}
          <Route path="story" element={<Story />} />
          <Route path="ingredients" element={<Ingredients />} />
          <Route path="reviews" element={
            <GenericPage title="Reviews" eyebrow="Testimonials">
               <DummyContent text="With thousands of five-star reviews, our hydrating lip gloss has achieved cult status. It's the secret weapon of makeup artists and the daily staple for those who refuse to compromise on quality." />
            </GenericPage>
          } />

          {/* Company Links */}
          <Route path="about" element={<About />} />
          <Route path="sustainability" element={
            <GenericPage title="Sustainability" eyebrow="Commitment">
               <DummyContent text="Luxury cannot exist without responsibility. Our tubes are crafted from 100% post-consumer recycled materials, and our packaging is entirely biodegradable. We are committed to remaining carbon-neutral." />
            </GenericPage>
          } />
          <Route path="press" element={
            <GenericPage title="Press" eyebrow="Media">
               <DummyContent text="Winner of the 2026 Beauty Innovator Awards. Featured globally in Vogue, Harper's Bazaar, Allure, and W Magazine." />
            </GenericPage>
          } />
          <Route path="contact" element={<Contact />} />

        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

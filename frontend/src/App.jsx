import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import Header from './components/Header';
import Hero from './components/Hero';
import TemplateGallery from './components/TemplateGallery';
import BiodataPreview from './components/BiodataFrom/BiodataPreview';
import ContactDetailsForm from './components/BiodataFrom/ContactDetailsForm';
import Footer from './components/Footer';


function App() {
  const methods = useForm();
  
  return (
    <BrowserRouter>
      <FormProvider {...methods}>
        <Routes>
          <Route
            path="/"
            element={
              <div className="w-full h-full flex flex-col">
                <Header />
                <Hero />
                <TemplateGallery />
                
                {/* <BiodataPreview /> */}
                {/* <Demo /> */}
                <ContactDetailsForm />
                <Footer />
              </div>
            }
          />
        </Routes>
      </FormProvider>
    </BrowserRouter>
  );
}

export default App;
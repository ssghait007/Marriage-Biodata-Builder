import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import Header from './components/Header';
import Hero from './components/Hero';
import TemplateGallery from './components/TemplateGallery';
import BiodataPreview from './components/BiodataFrom/BiodataPreview';
import ContactDetailsForm from './components/BiodataFrom/ContactDetailsForm';
import Footer from './components/Footer';
import Template_1 from './components/Templates/Template_1';
import Template_2 from './components/Templates/Template_2';
import Template_3 from './components/Templates/Template_3';
// import Demo from './components/demo';


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
                {/* <Demo /> */}
                {/* <Template_1 />                 */}
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
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import Header from './components/Header';
import Hero from './components/Hero';
import TemplateGallery from './components/TemplateGallery';
import SelectedTemplate from './components/SelectedTemplate';
import BiodataForm from './components/BiodataForm';
import Footer from './components/Footer';



function App() {
  const methods = useForm();
  const [Template, setTemplate] = useState(null);

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
                <TemplateGallery selectedTemplate={setTemplate}/>
                <BiodataForm template={Template}/>
                
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
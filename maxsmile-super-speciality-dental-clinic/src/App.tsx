import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ClinicIntroduction } from './components/ClinicIntroduction';
import { TreatmentDirectory } from './components/TreatmentDirectory';
import { ClinicalInformation } from './components/ClinicalInformation';
import { PatientJourney } from './components/PatientJourney';
import { PatientEducation } from './components/PatientEducation';
import { Reviews } from './components/Reviews';
import { ConsultationForm } from './components/ConsultationForm';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  const [selectedServiceForForm, setSelectedServiceForForm] = useState<string | undefined>();

  const handleSelectService = (serviceId: string) => {
    setSelectedServiceForForm(serviceId);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFB] flex flex-col font-['Inter',sans-serif] text-[#191C1D] selection:bg-[#B7D94A] selection:text-[#111519]">
      {/* Fixed Top Header */}
      <Header />

      {/* Main Content Sections */}
      <main className="flex-1 pt-16">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Clinic Introduction - The Maxsmile Approach */}
        <ClinicIntroduction />

        {/* 3. Dental Services Directory */}
        <TreatmentDirectory onSelectServiceForForm={handleSelectService} />

        {/* 4. Clinical Information Section */}
        <ClinicalInformation />

        {/* 5. Patient Journey Timeline */}
        <PatientJourney />

        {/* 6. Patient Education Accordion */}
        <PatientEducation />

        {/* 7. Verified Google Reviews & Reputation */}
        <Reviews />

        {/* 8. Consultation Intake Form */}
        <ConsultationForm selectedServiceId={selectedServiceForForm} />

        {/* 9. Contact, Location & Sargasan Details */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

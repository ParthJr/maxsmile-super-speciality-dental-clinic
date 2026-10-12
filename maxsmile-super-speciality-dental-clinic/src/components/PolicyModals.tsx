import React from 'react';
import { X, Shield, FileText } from 'lucide-react';
import { businessConfig } from '../config/businessConfig';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-sm border border-[#20252B] max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-5 bg-[#20252B] text-white flex items-center justify-between border-b border-[#2D353E]">
          <h3 className="font-['IBM_Plex_Sans'] text-lg font-bold tracking-tight">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#E1E3E4] hover:text-white hover:bg-[#1D252B] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto font-['Inter'] text-sm text-[#45474B] leading-relaxed flex flex-col gap-4">
          {children}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F2F4F5] border-t border-[#E1E3E4] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#20252B] text-white font-['IBM_Plex_Sans'] text-xs font-semibold rounded uppercase hover:bg-[#111519]"
          >
            Close Window
          </button>
        </div>

      </div>
    </div>
  );
};

export const PrivacyPolicyModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Privacy & Data Protection Policy">
      <div className="flex items-center gap-2 text-[#516600] font-['IBM_Plex_Sans'] text-xs font-bold uppercase">
        <Shield className="w-4 h-4" />
        <span>Clinical Information Privacy Notice</span>
      </div>
      <p>
        At <strong>{businessConfig.businessName}</strong>, patient confidentiality and medical record privacy are paramount.
      </p>
      <h4 className="font-['IBM_Plex_Sans'] font-semibold text-[#111519] text-base pt-2">1. Data Collection</h4>
      <p>
        Information submitted via our digital consultation intake form (full name, Indian mobile number, preferred appointment dates, and brief dental concerns) is processed strictly for appointment scheduling, patient triage, and clinical follow-up.
      </p>
      <h4 className="font-['IBM_Plex_Sans'] font-semibold text-[#111519] text-base pt-2">2. Communication Consent</h4>
      <p>
        By consenting on our consultation form, you authorize our reception team to contact you via phone or WhatsApp regarding consultation availability, appointment confirmation, and pre-operative guidelines.
      </p>
      <h4 className="font-['IBM_Plex_Sans'] font-semibold text-[#111519] text-base pt-2">3. Non-Disclosure</h4>
      <p>
        We do not sell, rent, or lease patient contact details or medical health records to third-party advertisers or telemarketers. All diagnostic records (digital radiographs, CBCT scans, treatment histories) are stored securely under Indian health data guidelines.
      </p>
    </Modal>
  );
};

export const TermsOfServiceModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Terms of Clinical Service">
      <div className="flex items-center gap-2 text-[#516600] font-['IBM_Plex_Sans'] text-xs font-bold uppercase">
        <FileText className="w-4 h-4" />
        <span>Consultation & Procedural Guidelines</span>
      </div>
      <p>
        Welcome to <strong>{businessConfig.businessName}</strong> in Sargasan, Gandhinagar.
      </p>
      <h4 className="font-['IBM_Plex_Sans'] font-semibold text-[#111519] text-base pt-2">1. Consultation Request Scope</h4>
      <p>
        Submitting an enquiry through this website constitutes a consultation request. Appointment slots are subject to final confirmation by clinic staff based on specialist availability and operatory scheduling.
      </p>
      <h4 className="font-['IBM_Plex_Sans'] font-semibold text-[#111519] text-base pt-2">2. Diagnostic Review</h4>
      <p>
        All proposed treatment plans, cost estimates, and procedural timelines are subject to direct in-person clinical assessment and anatomical verification via digital radiography or 3D CBCT imaging.
      </p>
      <h4 className="font-['IBM_Plex_Sans'] font-semibold text-[#111519] text-base pt-2">3. Operating Hours & Rotation</h4>
      <p>
        Our standard morning clinic operating hours begin at 10:00 AM. Specific specialist consultation times may vary according to procedure complexity and doctor duty rotation.
      </p>
    </Modal>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, AlertCircle, Loader2, ShieldCheck, CalendarCheck } from 'lucide-react';
import { businessConfig } from '../config/businessConfig';

gsap.registerPlugin(ScrollTrigger);

interface ConsultationFormProps {
  selectedServiceId?: string;
}

export const ConsultationForm: React.FC<ConsultationFormProps> = ({ selectedServiceId }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Form state
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [serviceOfInterest, setServiceOfInterest] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('Morning (10:00 AM – 01:00 PM)');
  const [message, setMessage] = useState('');
  const [privacyConsent, setPrivacyConsent] = useState(false);

  // UI status states
  const [submitting, setSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [successResponse, setSuccessResponse] = useState<{
    referenceId: string;
    details: { fullName: string; service: string; preferredDate: string; preferredTime: string };
  } | null>(null);

  // Preselect service if passed from Treatment Directory
  useEffect(() => {
    if (selectedServiceId) {
      const foundService = businessConfig.services.find((s) => s.id === selectedServiceId);
      if (foundService) {
        setServiceOfInterest(foundService.title);
      }
    }
  }, [selectedServiceId]);

  // Set min date for preferred date picker (today)
  const todayStr = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const validateForm = () => {
    const errors: Record<string, string> = {};

    // 1. Name
    if (!fullName.trim() || fullName.trim().length < 2) {
      errors.fullName = 'Full name is required (minimum 2 characters).';
    }

    // 2. Mobile
    const cleanMobile = mobileNumber.trim().replace(/\s+/g, '');
    const indianMobileRegex = /^(\+91[\-\s]?)?[6789]\d{9}$/;
    if (!cleanMobile) {
      errors.mobileNumber = 'Mobile number is required.';
    } else if (!indianMobileRegex.test(cleanMobile)) {
      errors.mobileNumber = 'Please enter a valid 10-digit Indian mobile number (e.g. 9876543210).';
    }

    // 3. Service
    if (!serviceOfInterest) {
      errors.serviceOfInterest = 'Please select a service of interest.';
    }

    // 4. Date validation
    if (preferredDate) {
      const chosen = new Date(preferredDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (chosen < today) {
        errors.preferredDate = 'Preferred date cannot be in the past.';
      }
    }

    // 5. Consent
    if (!privacyConsent) {
      errors.privacyConsent = 'You must consent to being contacted regarding this request.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(businessConfig.formSubmissionEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          mobileNumber,
          serviceOfInterest,
          preferredDate,
          preferredTime,
          message,
          privacyConsent,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccessResponse({
          referenceId: data.referenceId,
          details: data.details,
        });
      } else {
        if (data.errors) {
          setFieldErrors(data.errors);
        }
        setGeneralError(data.message || 'Submission failed. Please check your inputs and try again.');
      }
    } catch (err) {
      console.error('Error submitting consultation enquiry:', err);
      setGeneralError('Network error connecting to clinic server. Please check your connection or contact our clinic directly.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setFullName('');
    setMobileNumber('');
    setServiceOfInterest('');
    setPreferredDate('');
    setPreferredTime('Morning (10:00 AM – 01:00 PM)');
    setMessage('');
    setPrivacyConsent(false);
    setFieldErrors({});
    setGeneralError(null);
    setSuccessResponse(null);
  };

  return (
    <section
      id="consultation-booking"
      ref={containerRef}
      className="w-full bg-[#F2F4F5] py-16 lg:py-24 border-b border-[#E1E3E4]"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
        <div
          ref={cardRef}
          className="bg-white p-8 lg:p-12 rounded-sm border border-[#A8B0B8]/40 shadow-lg flex flex-col gap-8"
        >
          {/* Header */}
          <div className="flex flex-col gap-2">
            <span className="font-['IBM_Plex_Sans'] text-xs font-semibold text-[#516600] tracking-widest uppercase">
              CONSULTATION INTAKE
            </span>
            <h2 className="font-['IBM_Plex_Sans'] text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#20252B]">
              LET'S PLAN YOUR NEXT STEP.
            </h2>
            <p className="font-['Inter'] text-sm sm:text-base text-[#45474B] leading-relaxed">
              Share your enquiry so the clinic team can follow up about consultation availability and operatory scheduling.
            </p>
          </div>

          {/* Success State Screen */}
          {successResponse ? (
            <div className="p-6 bg-[#E6EDDB] border border-[#B7D94A] rounded-sm flex flex-col gap-6 animate-in fade-in duration-300">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-8 h-8 text-[#516600] shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <span className="font-['IBM_Plex_Sans'] text-xs font-bold text-[#516600] uppercase tracking-wider">
                    CONSULTATION REQUEST CONFIRMED
                  </span>
                  <h3 className="font-['IBM_Plex_Sans'] text-xl font-bold text-[#111519]">
                    Thank you, {successResponse.details.fullName}
                  </h3>
                  <p className="font-['Inter'] text-sm text-[#191C1D] leading-relaxed">
                    Your request has been logged under Reference ID:{' '}
                    <strong className="font-mono bg-white px-2 py-0.5 rounded border border-[#B7D94A]">
                      {successResponse.referenceId}
                    </strong>
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white rounded-sm border border-[#C5C6CB]/40 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-['Inter'] text-[#45474B]">
                <div>
                  <span className="font-['IBM_Plex_Sans'] font-semibold uppercase block text-[10px] text-[#A8B0B8]">
                    CLINICAL SERVICE
                  </span>
                  <span className="font-medium text-[#111519]">{successResponse.details.service}</span>
                </div>
                <div>
                  <span className="font-['IBM_Plex_Sans'] font-semibold uppercase block text-[10px] text-[#A8B0B8]">
                    PREFERRED DATE & TIME
                  </span>
                  <span className="font-medium text-[#111519]">
                    {successResponse.details.preferredDate !== 'Not specified'
                      ? `${successResponse.details.preferredDate} (${successResponse.details.preferredTime})`
                      : successResponse.details.preferredTime}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#B7D94A]/40">
                <span className="font-['IBM_Plex_Sans'] text-[11px] text-[#516600] font-semibold uppercase">
                  Our reception desk will contact you shortly to confirm operatory timing.
                </span>
                <button
                  onClick={handleResetForm}
                  className="px-4 py-2 bg-[#20252B] text-white font-['IBM_Plex_Sans'] text-xs font-semibold rounded uppercase hover:bg-[#111519] transition-colors"
                >
                  Submit Another Request
                </button>
              </div>
            </div>
          ) : (
            /* Technical Intake Form */
            <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* General Error Alert */}
              {generalError && (
                <div className="md:col-span-2 p-4 bg-[#FFDAD6] border border-[#BA1A1A] rounded-sm flex items-start gap-3 text-[#93000A]">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <span className="font-['Inter'] text-sm font-medium">{generalError}</span>
                </div>
              )}

              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="full-name" className="font-['IBM_Plex_Sans'] text-xs font-bold text-[#20252B] uppercase">
                  FULL NAME *
                </label>
                <input
                  id="full-name"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (fieldErrors.fullName) setFieldErrors((prev) => ({ ...prev, fullName: '' }));
                  }}
                  placeholder="e.g. Ramesh Patel"
                  className={`px-4 py-3 bg-[#F2F4F5] text-[#111519] font-['Inter'] text-sm rounded-sm focus:outline-none focus:bg-white focus:ring-2 transition-all ${
                    fieldErrors.fullName
                      ? 'border border-[#BA1A1A] focus:ring-[#BA1A1A]'
                      : 'border border-[#E1E3E4] focus:ring-[#20252B]'
                  }`}
                />
                {fieldErrors.fullName && (
                  <span className="font-['Inter'] text-xs text-[#BA1A1A]">{fieldErrors.fullName}</span>
                )}
              </div>

              {/* Mobile Number */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="mobile-number" className="font-['IBM_Plex_Sans'] text-xs font-bold text-[#20252B] uppercase">
                  INDIAN MOBILE NUMBER *
                </label>
                <input
                  id="mobile-number"
                  type="tel"
                  required
                  value={mobileNumber}
                  onChange={(e) => {
                    setMobileNumber(e.target.value);
                    if (fieldErrors.mobileNumber) setFieldErrors((prev) => ({ ...prev, mobileNumber: '' }));
                  }}
                  placeholder="+91 98XXX XXXXX"
                  className={`px-4 py-3 bg-[#F2F4F5] text-[#111519] font-['Inter'] text-sm rounded-sm focus:outline-none focus:bg-white focus:ring-2 transition-all ${
                    fieldErrors.mobileNumber
                      ? 'border border-[#BA1A1A] focus:ring-[#BA1A1A]'
                      : 'border border-[#E1E3E4] focus:ring-[#20252B]'
                  }`}
                />
                {fieldErrors.mobileNumber && (
                  <span className="font-['Inter'] text-xs text-[#BA1A1A]">{fieldErrors.mobileNumber}</span>
                )}
              </div>

              {/* Service of Interest */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="service-select" className="font-['IBM_Plex_Sans'] text-xs font-bold text-[#20252B] uppercase">
                  SERVICE OF INTEREST *
                </label>
                <select
                  id="service-select"
                  required
                  value={serviceOfInterest}
                  onChange={(e) => {
                    setServiceOfInterest(e.target.value);
                    if (fieldErrors.serviceOfInterest) setFieldErrors((prev) => ({ ...prev, serviceOfInterest: '' }));
                  }}
                  className={`px-4 py-3 bg-[#F2F4F5] text-[#111519] font-['Inter'] text-sm rounded-sm focus:outline-none focus:bg-white focus:ring-2 transition-all ${
                    fieldErrors.serviceOfInterest
                      ? 'border border-[#BA1A1A] focus:ring-[#BA1A1A]'
                      : 'border border-[#E1E3E4] focus:ring-[#20252B]'
                  }`}
                >
                  <option value="">Select a clinical area</option>
                  <option value="General & Preventive Care">General & Preventive Care</option>
                  <option value="Restorative & Root Canal Care">Restorative & Root Canal Care</option>
                  <option value="Oral Surgery & Extractions">Oral Surgery & Extractions</option>
                  <option value="Cosmetic Dentistry & Teeth Whitening">Cosmetic Dentistry & Whitening</option>
                  <option value="Paediatric Dentistry">Paediatric Assessment</option>
                  <option value="Dental Implants">Dental Implants</option>
                  <option value="Comprehensive Second Opinion">Comprehensive Second Opinion</option>
                </select>
                {fieldErrors.serviceOfInterest && (
                  <span className="font-['Inter'] text-xs text-[#BA1A1A]">{fieldErrors.serviceOfInterest}</span>
                )}
              </div>

              {/* Preferred Date */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="preferred-date" className="font-['IBM_Plex_Sans'] text-xs font-bold text-[#20252B] uppercase">
                  PREFERRED DATE
                </label>
                <input
                  id="preferred-date"
                  type="date"
                  min={todayStr}
                  value={preferredDate}
                  onChange={(e) => {
                    setPreferredDate(e.target.value);
                    if (fieldErrors.preferredDate) setFieldErrors((prev) => ({ ...prev, preferredDate: '' }));
                  }}
                  className={`px-4 py-3 bg-[#F2F4F5] text-[#111519] font-['Inter'] text-sm rounded-sm focus:outline-none focus:bg-white focus:ring-2 transition-all ${
                    fieldErrors.preferredDate
                      ? 'border border-[#BA1A1A] focus:ring-[#BA1A1A]'
                      : 'border border-[#E1E3E4] focus:ring-[#20252B]'
                  }`}
                />
                {fieldErrors.preferredDate && (
                  <span className="font-['Inter'] text-xs text-[#BA1A1A]">{fieldErrors.preferredDate}</span>
                )}
              </div>

              {/* Preferred Time Window */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="preferred-time" className="font-['IBM_Plex_Sans'] text-xs font-bold text-[#20252B] uppercase">
                  PREFERRED TIME WINDOW
                </label>
                <select
                  id="preferred-time"
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  className="px-4 py-3 bg-[#F2F4F5] text-[#111519] font-['Inter'] text-sm rounded-sm border border-[#E1E3E4] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#20252B] transition-all"
                >
                  <option value="Morning (10:00 AM – 01:00 PM)">Morning (10:00 AM – 01:00 PM)</option>
                  <option value="Afternoon (01:00 PM – 05:00 PM)">Afternoon (01:00 PM – 05:00 PM)</option>
                  <option value="Evening (05:00 PM – 08:30 PM)">Evening (05:00 PM – 08:30 PM)</option>
                </select>
              </div>

              {/* Clinic Facility Read-only Badge */}
              <div className="flex flex-col gap-1.5">
                <label className="font-['IBM_Plex_Sans'] text-xs font-bold text-[#20252B] uppercase">
                  CLINIC FACILITY
                </label>
                <div className="px-4 py-3 bg-[#ECEEEF] text-[#111519] font-['Inter'] text-sm rounded-sm border border-[#E1E3E4] flex items-center justify-between">
                  <span>Sargasan Branch (Gandhinagar)</span>
                  <ShieldCheck className="w-4 h-4 text-[#516600]" />
                </div>
              </div>

              {/* Optional Message */}
              <div className="md:col-span-2 flex flex-col gap-1.5">
                <label htmlFor="message" className="font-['IBM_Plex_Sans'] text-xs font-bold text-[#20252B] uppercase">
                  BRIEF DENTAL CONCERN (OPTIONAL)
                </label>
                <textarea
                  id="message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe symptoms, duration, or any previous treatments..."
                  className="px-4 py-3 bg-[#F2F4F5] text-[#111519] font-['Inter'] text-sm rounded-sm border border-[#E1E3E4] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#20252B] transition-all"
                />
              </div>

              {/* Privacy Consent Checkbox */}
              <div className="md:col-span-2 flex flex-col gap-1 pt-2">
                <div className="flex items-start gap-3">
                  <input
                    id="privacy-consent"
                    type="checkbox"
                    required
                    checked={privacyConsent}
                    onChange={(e) => {
                      setPrivacyConsent(e.target.checked);
                      if (fieldErrors.privacyConsent) setFieldErrors((prev) => ({ ...prev, privacyConsent: '' }));
                    }}
                    className="mt-1 h-4 w-4 rounded-sm text-[#20252B] accent-[#20252B] focus:ring-0 cursor-pointer"
                  />
                  <label htmlFor="privacy-consent" className="font-['Inter'] text-xs text-[#45474B] cursor-pointer">
                    I consent to Maxsmile contacting me via telephone/WhatsApp regarding this dental consultation request.
                  </label>
                </div>
                {fieldErrors.privacyConsent && (
                  <span className="font-['Inter'] text-xs text-[#BA1A1A] pl-7">{fieldErrors.privacyConsent}</span>
                )}
              </div>

              {/* Submit Button */}
              <div className="md:col-span-2 pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#20252B] text-white font-['IBM_Plex_Sans'] text-xs font-bold tracking-widest uppercase rounded-sm hover:bg-[#111519] transition-all group shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#B7D94A]" />
                      <span>LOGGING CONSULTATION REQUEST...</span>
                    </>
                  ) : (
                    <>
                      <span>REQUEST A CONSULTATION</span>
                      <span className="w-2 h-2 rounded-full bg-[#B7D94A] group-hover:scale-125 transition-transform" />
                    </>
                  )}
                </button>

                <p className="font-['IBM_Plex_Sans'] text-[11px] text-[#878C93] text-center pt-3 uppercase">
                  * A submitted enquiry is a consultation request and will be confirmed by the clinic team based on scheduling availability.
                </p>
              </div>

            </form>
          )}

        </div>
      </div>
    </section>
  );
};

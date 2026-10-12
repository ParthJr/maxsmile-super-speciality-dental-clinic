export interface TreatmentService {
  id: string;
  code: string;
  title: string;
  category: string;
  description: string;
  frequencyOrGoal: string;
  icon: string;
  verified: boolean;
}

export interface PatientJourneyStep {
  stageNumber: string;
  title: string;
  description: string;
}

export interface ClinicalInfoCard {
  number: string;
  category: string;
  title: string;
  description: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface BusinessConfig {
  businessName: string;
  shortName: string;
  subtitle: string;
  address: string;
  landmark: string;
  cityStatePincode: string;
  rating: number;
  reviewCount: number;
  openingTime: string;
  weeklyScheduleNote: string;
  coordinates: string;
  phone: string | null; // Set to phone string when verified (e.g. "+91 98765 43210")
  email: string;
  mapUrl: string;
  reviewUrl: string;
  enablePhoneCTA: boolean;
  operatoryImageUrl: string;
  formSubmissionEndpoint: string;
  services: TreatmentService[];
  patientJourney: PatientJourneyStep[];
  clinicalInfoCards: ClinicalInfoCard[];
  faqs: FAQItem[];
}

export const businessConfig: BusinessConfig = {
  businessName: "Maxsmile Super Speciality Dental Clinic",
  shortName: "MAXSMILE",
  subtitle: "SUPER SPECIALITY DENTAL CLINIC",
  address: "Shyam Heights, 105, Palm Road, near Gurudwara, Sargasan, Gandhinagar, Gujarat 382419",
  landmark: "Near Gurudwara",
  cityStatePincode: "Sargasan, Gandhinagar, Gujarat 382419",
  rating: 5.0,
  reviewCount: 21,
  openingTime: "10:00 AM",
  weeklyScheduleNote: "* Opening schedule: 10:00 AM (Subject to weekly verification and doctor rotation).",
  coordinates: `23°10'41"N 72°37'52"E`,
  phone: null, // Hidden until verified per prompt requirements
  email: "care@maxsmiledental.in",
  mapUrl: "https://maps.google.com/?q=Shyam+Heights+105+Palm+Road+near+Gurudwara+Sargasan+Gandhinagar+Gujarat+382419",
  reviewUrl: "https://maps.google.com/?q=Maxsmile+Super+Speciality+Dental+Clinic+Sargasan+Gandhinagar",
  enablePhoneCTA: false, // Automatically controlled or toggled when phone is set
  operatoryImageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAr89nmzdvTNo9yGjBmujK9mOqL6BQLisQQuqjqNo6h8pBd8Ho0jpDTD8qkv1hN_Jy-Mp_hwj0OCnuJ19a4RCHx2no46dVWtxX5WuARo2tjmuoMoPKLcfQnUlaPTgn3i9guuqEki1HOyXnh0iEu4I8XoHkeaVrGhoQ0r-dKmsDWYpVORbUF2LIhiFXQPDlaZr5UFXTS0dwQbTqDkVb5el8YJdvdTkUdAEp1HLuInZRCNHQ37SIELA2O",
  formSubmissionEndpoint: "/api/consultation",
  services: [
    {
      id: "service-01",
      code: "01 / PREVENTIVE MEDICINE",
      title: "General & Preventive Care",
      category: "Check-ups & Hygiene",
      description: "Clinical dental examinations, routine ultrasonic hygiene, calculus debridement, and early periodontal screening. Designed to halt degenerative oral conditions before invasive intervention is needed.",
      frequencyOrGoal: "FREQUENCY: 6-MONTH RECALL",
      icon: "health_and_safety",
      verified: true
    },
    {
      id: "service-02",
      code: "02 / ENDODONTIC PROTOCOLS",
      title: "Restorative & Root Canal Care",
      category: "Root Canal Treatment",
      description: "Root canal treatment executed under optical magnification, bio-ceramic obturation, and conservative composite resin bonding aimed at preserving natural tooth structure.",
      frequencyOrGoal: "GOAL: PULPAL PRESERVATION",
      icon: "vital_signs",
      verified: true
    },
    {
      id: "service-03",
      code: "03 / SURGICAL EXCELLENCE",
      title: "Oral Surgery & Extractions",
      category: "Oral Surgery",
      description: "Careful surgical extraction planning for impacted third molars and non-restorable roots with bone-preservation technique. (Subject to comprehensive radiographic verification).",
      frequencyOrGoal: "EVALUATION: MANDATORY CBCT",
      icon: "medical_services",
      verified: true
    },
    {
      id: "service-04",
      code: "04 / ESTHETICS & VENEERS",
      title: "Cosmetic Dentistry & Teeth Whitening",
      category: "Teeth Whitening",
      description: "Professional in-office teeth whitening systems, ultra-thin ceramic veneers, and proportion analysis designed to harmonize facial symmetry without unnecessary enamel reduction.",
      frequencyOrGoal: "METHOD: MINIMAL PREPARATION",
      icon: "flare",
      verified: true
    },
    {
      id: "service-05",
      code: "05 / PAEDIATRIC PROTOCOLS",
      title: "Paediatric Dentistry",
      category: "Children's Dental Care",
      description: "Calm, anxiety-free dental assessments for young patients. Interceptive orthodontics, pit-and-fissure sealants, and habitual guidance to ensure optimal primary-to-permanent dentition development.",
      frequencyOrGoal: "APPROACH: BEHAVIOR GUIDANCE",
      icon: "child_care",
      verified: true
    },
    {
      id: "service-06",
      code: "06 / IMPLANT REHABILITATION",
      title: "Dental Implants",
      category: "3D Guided Implants",
      description: "3D guided surgical placement of titanium implants for single-tooth or full-arch restoration. Restores chewing dynamics and prevents adjacent bone resorption.",
      frequencyOrGoal: "TECH: 3D COMPUTER-GUIDED",
      icon: "dentistry",
      verified: true
    }
  ],
  patientJourney: [
    {
      stageNumber: "01",
      title: "Enquire",
      description: "Share your contact details and the primary reason for your visit via our digital consultation intake desk."
    },
    {
      stageNumber: "02",
      title: "Assess",
      description: "Meet the clinical specialist to discuss your dental concerns, past medical history, and clinical symptoms."
    },
    {
      stageNumber: "03",
      title: "Review",
      description: "Examine diagnostic evidence, understand clinical findings, and weigh viable medical alternatives."
    },
    {
      stageNumber: "04",
      title: "Plan",
      description: "Agree on a sequenced treatment plan, confirm schedule availability, and start therapy with confidence."
    }
  ],
  clinicalInfoCards: [
    {
      number: "01",
      category: "PRIMARY CONCERNS",
      title: "Dental Concerns",
      description: "Express pain thresholds, cosmetic reservations, chewing discomfort, or structural wear without time pressure."
    },
    {
      number: "02",
      category: "INVESTIGATIONS",
      title: "Relevant Findings",
      description: "Review your digital panorex or CBCT radiographs directly on high-definition chairside displays with the specialist."
    },
    {
      number: "03",
      category: "ALTERNATIVES",
      title: "Treatment Options",
      description: "Evaluate conservative preservation vs. prosthetic intervention with objective pros and cons explained in plain terms."
    },
    {
      number: "04",
      category: "REALISTIC SCOPE",
      title: "Benefits & Limitations",
      description: "Know the realistic longevity, functional improvements, and potential biological limitations of each prosthetic solution."
    },
    {
      number: "05",
      category: "TRANSPARENCY",
      title: "Costs & Timelines",
      description: "Receive straightforward itemized treatment cost breakdowns with clear schedules for every individual session."
    },
    {
      number: "06",
      category: "LONGEVITY",
      title: "Follow-up & Care",
      description: "Structured hygiene recalls, night guard recommendations, and customized maintenance ensure optimal treatment life."
    }
  ],
  faqs: [
    {
      id: "faq-1",
      question: "What happens during a dental check-up?",
      answer: "A comprehensive clinical check-up includes a visual examination of soft tissues, gum assessment, occlusal review, and intraoral scans or digital radiographs if indicated. The specialist reviews all findings with you prior to proposing any intervention."
    },
    {
      id: "faq-2",
      question: "What should I know before root canal treatment?",
      answer: "Root canal therapy is aimed at preserving a tooth whose internal pulp is inflamed or infected. Modern endodontics utilizes local anesthesia and rotary micro-instruments to ensure minimal discomfort throughout the cleansing and sealing sequence."
    },
    {
      id: "faq-3",
      question: "What should I ask before considering dental implants?",
      answer: "Key factors include available alveolar bone height and density, anatomical sinus proximity, medical conditions such as diabetes, expected osseointegration timelines, and whether bone grafting is necessary prior to fixture placement."
    },
    {
      id: "faq-4",
      question: "What should parents know before a child's dental visit?",
      answer: "We focus on familiarity and low-stress desensitization. Parents are advised not to use triggering language (\"pain\", \"needle\"). The initial appointment centers on gentle visual inspection and oral habit counseling."
    },
    {
      id: "faq-5",
      question: "What should I ask about oral surgery or tooth extraction?",
      answer: "Ask about anticipated post-operative healing periods, necessary pain management regimens, post-extraction socket preservation protocols, and future tooth replacement strategies before extracting permanent dentition."
    },
    {
      id: "faq-6",
      question: "What should I know before teeth whitening?",
      answer: "Whitening acts on natural enamel; existing composite fillings, porcelain crowns, and veneers do not change shade. A pre-bleaching assessment ensures gums are healthy and dentin sensitivity is addressed first."
    }
  ]
};

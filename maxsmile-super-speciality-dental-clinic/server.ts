import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// In-memory + file storage for consultation enquiries
const DATA_FILE = path.join(__dirname, 'consultations.json');

interface ConsultationSubmission {
  id: string;
  fullName: string;
  mobileNumber: string;
  serviceOfInterest: string;
  preferredDate?: string;
  preferredTime?: string;
  facilityLocation: string;
  message?: string;
  privacyConsent: boolean;
  submittedAt: string;
  status: 'PENDING' | 'CONFIRMED' | 'CONTACTED';
}

function getSubmissions(): ConsultationSubmission[] {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading consultations file:', err);
  }
  return [];
}

function saveSubmission(submission: ConsultationSubmission) {
  const list = getSubmissions();
  list.unshift(submission); // prepend
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(list, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing consultations file:', err);
  }
}

// Phone number regex for Indian mobile numbers (+91 or 10 digits starting with 6,7,8,9)
const INDIAN_MOBILE_REGEX = /^(\+91[\-\s]?)?[6789]\d{9}$/;

// API Route: POST Consultation Enquiry
app.post('/api/consultation', (req: Request, res: Response) => {
  try {
    const {
      fullName,
      mobileNumber,
      serviceOfInterest,
      preferredDate,
      preferredTime,
      message,
      privacyConsent,
    } = req.body;

    const errors: Record<string, string> = {};

    // 1. Full name validation
    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
      errors.fullName = 'Full name is required (at least 2 characters).';
    }

    // 2. Mobile number validation
    const cleanMobile = mobileNumber ? String(mobileNumber).trim().replace(/\s+/g, '') : '';
    if (!cleanMobile) {
      errors.mobileNumber = 'Indian mobile number is required.';
    } else if (!INDIAN_MOBILE_REGEX.test(cleanMobile)) {
      errors.mobileNumber = 'Please enter a valid 10-digit Indian mobile number (e.g., 9876543210 or +91 9876543210).';
    }

    // 3. Service selection validation
    if (!serviceOfInterest || typeof serviceOfInterest !== 'string' || serviceOfInterest.trim() === '') {
      errors.serviceOfInterest = 'Please select a clinical service of interest.';
    }

    // 4. Preferred date validation (must not be in the past)
    if (preferredDate) {
      const selectedDate = new Date(preferredDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (isNaN(selectedDate.getTime())) {
        errors.preferredDate = 'Invalid date format.';
      } else if (selectedDate < today) {
        errors.preferredDate = 'Preferred date cannot be in the past.';
      }
    }

    // 5. Consent validation
    if (!privacyConsent) {
      errors.privacyConsent = 'You must consent to being contacted by Maxsmile clinic team.';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed. Please review your entries.',
        errors,
      });
    }

    const newSubmission: ConsultationSubmission = {
      id: `MS-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      fullName: fullName.trim(),
      mobileNumber: cleanMobile,
      serviceOfInterest,
      preferredDate: preferredDate || 'Not specified',
      preferredTime: preferredTime || 'Morning (10:00 AM – 01:00 PM)',
      facilityLocation: 'Sargasan Branch (Gandhinagar)',
      message: message ? message.trim() : '',
      privacyConsent: Boolean(privacyConsent),
      submittedAt: new Date().toISOString(),
      status: 'PENDING',
    };

    saveSubmission(newSubmission);

    return res.status(200).json({
      success: true,
      message: 'Consultation request received successfully. Our reception desk will follow up shortly to confirm your slot.',
      referenceId: newSubmission.id,
      details: {
        fullName: newSubmission.fullName,
        service: newSubmission.serviceOfInterest,
        preferredDate: newSubmission.preferredDate,
        preferredTime: newSubmission.preferredTime,
      },
    });
  } catch (error) {
    console.error('Server error processing consultation request:', error);
    return res.status(500).json({
      success: false,
      message: 'An internal server error occurred while logging your request. Please try again or visit our clinic in Sargasan.',
    });
  }
});

// API Route: GET Consultations (For admin review or testing)
app.get('/api/consultation', (_req: Request, res: Response) => {
  const list = getSubmissions();
  res.json({ success: true, count: list.length, submissions: list });
});

// Start Express with Vite Middleware in Development, or Static Serving in Production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });
    app.use(vite.middlewares);

    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.use('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Maxsmile Dental Express server running on port ${PORT}`);
  });
}

startServer();

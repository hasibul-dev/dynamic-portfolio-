import type { ContactFormData } from '@/types';
import emailjs from '@emailjs/browser';

// EmailJS configuration
const EMAILJS_PUBLIC_KEY = 'q4_LZbC5qRjZ1BG0A';
const EMAILJS_SERVICE_ID = 'service_0dtcu1e';
const EMAILJS_TEMPLATE_ID = 'template_kphhyn9';

export const emailService = {
  // Send contact form email via EmailJS
  sendContactEmail: async (formData: ContactFormData): Promise<void> => {
    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject_matrix: formData.subject,
        message: formData.message,
      };

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      if (response.status !== 200) {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Email service error:', error);
      throw error;
    }
  },
};


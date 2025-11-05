'use client';

import { useState } from 'react';

interface FormData {
  name: string;
  phone: string;
  email: string;
  message: string;
  date: string;
  time: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    message: '',
    date: '',
    time: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Required fields validation
    if (!formData.name.trim()) {
      newErrors.name = 'Το όνομα είναι υποχρεωτικό';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Το όνομα πρέπει να έχει τουλάχιστον 2 χαρακτήρες';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Το τηλέφωνο είναι υποχρεωτικό';
    } else if (
      !/^(\+30|0030|30)?[0-9]{10}$/.test(formData.phone.replace(/\s/g, ''))
    ) {
      newErrors.phone = 'Παρακαλώ εισάγετε έγκυρο ελληνικό τηλέφωνο';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Το μήνυμα είναι υποχρεωτικό';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Το μήνυμα πρέπει να έχει τουλάχιστον 10 χαρακτήρες';
    }

    // Optional email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Παρακαλώ εισάγετε έγκυρο email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage(
          'Το μήνυμά σας στάλθηκε επιτυχώς! Θα επικοινωνήσουμε μαζί σας σύντομα.'
        );
        setFormData({
          name: '',
          phone: '',
          email: '',
          message: '',
          date: '',
          time: '',
        });
      } else {
        throw new Error('Κάτι πήγε στραβά');
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage(
        'Συγγνώμη, υπήρξε πρόβλημα με την αποστολή. Παρακαλώ δοκιμάστε ξανά ή τηλεφωνήστε μας.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto'>
      <div className='text-center mb-8'>
        <h2 className='text-3xl font-bold text-gray-900 mb-2'>
          Επικοινωνήστε μαζί μας
        </h2>
        <p className='text-gray-600'>
          Στείλτε μας το μήνυμά σας και θα επικοινωνήσουμε μαζί σας άμεσα
        </p>
      </div>

      <form onSubmit={handleSubmit} className='space-y-6'>
        {/* Name Field */}
        <div>
          <label
            htmlFor='name'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            Όνομα *
          </label>
          <input
            type='text'
            id='name'
            name='name'
            value={formData.name}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder='Το όνομά σας'
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <p
              id='name-error'
              className='mt-1 text-sm text-red-600'
              role='alert'
            >
              {errors.name}
            </p>
          )}
        </div>

        {/* Phone Field */}
        <div>
          <label
            htmlFor='phone'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            Τηλέφωνο *
          </label>
          <input
            type='tel'
            id='phone'
            name='phone'
            value={formData.phone}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder='210 123 4567 ή +30 210 123 4567'
            aria-invalid={errors.phone ? 'true' : 'false'}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
          />
          {errors.phone && (
            <p
              id='phone-error'
              className='mt-1 text-sm text-red-600'
              role='alert'
            >
              {errors.phone}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            Email <span className='text-gray-500'>(προαιρετικό)</span>
          </label>
          <input
            type='email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder='your@email.com'
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p
              id='email-error'
              className='mt-1 text-sm text-red-600'
              role='alert'
            >
              {errors.email}
            </p>
          )}
        </div>

        {/* Date and Time Fields */}
        <div className='grid md:grid-cols-2 gap-4'>
          <div>
            <label
              htmlFor='date'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Ημερομηνία <span className='text-gray-500'>(προαιρετικό)</span>
            </label>
            <input
              type='date'
              id='date'
              name='date'
              value={formData.date}
              onChange={handleInputChange}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors'
            />
          </div>

          <div>
            <label
              htmlFor='time'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Ώρα <span className='text-gray-500'>(προαιρετικό)</span>
            </label>
            <input
              type='time'
              id='time'
              name='time'
              value={formData.time}
              onChange={handleInputChange}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors'
            />
          </div>
        </div>

        {/* Message Field */}
        <div>
          <label
            htmlFor='message'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            Μήνυμα *
          </label>
          <textarea
            id='message'
            name='message'
            value={formData.message}
            onChange={handleInputChange}
            rows={4}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-vertical ${
              errors.message ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder='Περιγράψτε την εκδρομή που επιθυμείτε...'
            aria-invalid={errors.message ? 'true' : 'false'}
            aria-describedby={errors.message ? 'message-error' : undefined}
          />
          {errors.message && (
            <p
              id='message-error'
              className='mt-1 text-sm text-red-600'
              role='alert'
            >
              {errors.message}
            </p>
          )}
        </div>

        {/* Submit Status Messages */}
        {submitStatus === 'success' && (
          <div
            className='p-4 bg-green-50 border border-green-200 rounded-lg'
            role='alert'
          >
            <p className='text-green-800 font-medium'>✅ {submitMessage}</p>
          </div>
        )}

        {submitStatus === 'error' && (
          <div
            className='p-4 bg-red-50 border border-red-200 rounded-lg'
            role='alert'
          >
            <p className='text-red-800 font-medium'>❌ {submitMessage}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type='submit'
          disabled={isSubmitting}
          className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-primary text-white hover:bg-primary/90 hover:shadow-lg'
          }`}
        >
          {isSubmitting ? (
            <span className='flex items-center justify-center space-x-2'>
              <svg className='animate-spin h-5 w-5' viewBox='0 0 24 24'>
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'
                  fill='none'
                />
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                />
              </svg>
              <span>Αποστολή...</span>
            </span>
          ) : (
            'Στείλε Μήνυμα'
          )}
        </button>
      </form>

      {/* Alternative contact info */}
      <div className='mt-8 pt-6 border-t border-gray-200 text-center'>
        <p className='text-gray-600 mb-2'>Ή επικοινωνήστε μαζί μας άμεσα:</p>
        <a
          href='tel:+306978277120'
          className='text-primary hover:text-primary/80 font-medium'
        >
          📞 +30 697 827 7120
        </a>
      </div>
    </div>
  );
}

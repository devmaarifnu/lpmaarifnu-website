'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { submitContactForm } from '@/lib/api';
import toast from 'react-hot-toast';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [responseMessage, setResponseMessage] = useState('');

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nama wajib diisi';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email wajib diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }

    // Phone is optional according to API
    if (formData.phone.trim() && !/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Format nomor telepon tidak valid';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subjek wajib diisi';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Pesan wajib diisi';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Pesan minimal 10 karakter';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setStatus('loading');
    setResponseMessage('');

    try {
      const result = await submitContactForm(formData);

      setStatus('success');
      setResponseMessage(`Terima kasih! Pesan Anda telah berhasil dikirim dengan Ticket ID: ${result.ticket_id}. Kami akan segera menghubungi Anda.`);

      toast.success('Pesan berhasil dikirim!');

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });

      // Reset success message after 8 seconds
      setTimeout(() => {
        setStatus('idle');
        setResponseMessage('');
      }, 8000);
    } catch (error) {
      console.error('Contact form error:', error);
      setStatus('error');
      setResponseMessage(error.message || 'Terjadi kesalahan. Silakan coba lagi.');

      toast.error('Gagal mengirim pesan. Silakan coba lagi.');

      setTimeout(() => {
        setStatus('idle');
        setResponseMessage('');
      }, 5000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Status Message */}
      {status === 'success' && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-green-800">{responseMessage}</p>
        </div>
      )}

      {status === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-800">{responseMessage}</p>
        </div>
      )}

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-neutral-700 mb-2">
          Nama Lengkap <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors bg-white text-neutral-900 placeholder:text-neutral-400 ${
            errors.name ? 'border-red-500' : 'border-neutral-300'
          }`}
          placeholder="Masukkan nama lengkap Anda"
          disabled={status === 'loading'}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
        )}
      </div>

      {/* Email and Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-neutral-700 mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors bg-white text-neutral-900 placeholder:text-neutral-400 ${
              errors.email ? 'border-red-500' : 'border-neutral-300'
            }`}
            placeholder="nama@email.com"
            disabled={status === 'loading'}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-neutral-700 mb-2">
            Nomor Telepon <span className="text-neutral-400">(opsional)</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors bg-white text-neutral-900 placeholder:text-neutral-400 ${
              errors.phone ? 'border-red-500' : 'border-neutral-300'
            }`}
            placeholder="08123456789"
            disabled={status === 'loading'}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
          )}
        </div>
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className="block text-sm font-semibold text-neutral-700 mb-2">
          Subjek <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors bg-white text-neutral-900 placeholder:text-neutral-400 ${
            errors.subject ? 'border-red-500' : 'border-neutral-300'
          }`}
          placeholder="Topik pesan Anda"
          disabled={status === 'loading'}
        />
        {errors.subject && (
          <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-neutral-700 mb-2">
          Pesan <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={6}
          className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors resize-none bg-white text-neutral-900 placeholder:text-neutral-400 ${
            errors.message ? 'border-red-500' : 'border-neutral-300'
          }`}
          placeholder="Tulis pesan Anda di sini..."
          disabled={status === 'loading'}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message}</p>
        )}
        <p className="mt-1 text-xs text-neutral-500">
          Minimal 10 karakter
        </p>
      </div>

      {/* Submit Button */}
      <div>
        <Button
          type="submit"
          disabled={status === 'loading'}
          className="w-full md:w-auto px-8 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Mengirim...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Kirim Pesan
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

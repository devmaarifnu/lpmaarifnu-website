# API Contact Documentation

## Overview
Dokumentasi untuk API endpoint Contact yang digunakan untuk menerima pesan dari formulir kontak di website.

## Endpoint

### POST /api/v1/contact

Mengirim pesan kontak dari pengunjung website.

#### Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "08123456789",
  "subject": "Pertanyaan tentang Program Beasiswa",
  "message": "Saya ingin mengetahui lebih lanjut tentang program beasiswa yang tersedia..."
}
```

#### Request Fields

| Field   | Type   | Required | Description                      | Validation                           |
|---------|--------|----------|----------------------------------|--------------------------------------|
| name    | string | Yes      | Nama lengkap pengirim            | Min 3 characters                     |
| email   | string | Yes      | Alamat email pengirim            | Valid email format                   |
| phone   | string | Yes      | Nomor telepon pengirim           | Valid phone format                   |
| subject | string | Yes      | Subjek pesan                     | Min 5 characters                     |
| message | string | Yes      | Isi pesan                        | Min 10 characters, Max 1000 chars    |

#### Response Structure

**Success Response (200)**:
```json
{
  "success": true,
  "message": "Pesan berhasil dikirim. Kami akan segera menghubungi Anda.",
  "data": {
    "id": 123,
    "submitted_at": "2024-01-13T10:00:00Z"
  }
}
```

**Error Response (400/500)**:
```json
{
  "success": false,
  "message": "Validation error",
  "errors": {
    "email": "Format email tidak valid",
    "message": "Pesan minimal 10 karakter"
  }
}
```

## Database Schema Suggestion

```sql
CREATE TABLE contact_messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    status VARCHAR(50) DEFAULT 'new', -- new, read, replied, archived
    replied_at TIMESTAMP NULL,
    replied_by INTEGER NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);

-- Indexes
CREATE INDEX idx_contact_messages_status ON contact_messages(status);
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at);
CREATE INDEX idx_contact_messages_email ON contact_messages(email);
```

## Settings API Enhancement

The contact page also uses the `GET /api/v1/settings` endpoint to fetch contact information.

### Enhanced Settings Response

```json
{
  "success": true,
  "message": "Settings retrieved successfully",
  "data": {
    "site_name": "LP Ma'arif NU",
    "site_description": "Lembaga Pendidikan Ma'arif Nahdlatul Ulama",
    "logo": "https://example.com/logo.png",
    "favicon": "https://example.com/favicon.ico",
    "contact": {
      "address": "Jl. Kramat Raya No. 45, Jakarta Pusat 10450",
      "phone": "(021) 3920679",
      "email": "info@lpmaarifnu.or.id",
      "website": "https://www.lpmaarifnu.or.id",
      "maps_embed": "https://www.google.com/maps/embed?pb=...",
      "office_hours": {
        "weekdays": "08:00 - 16:00 WIB",
        "friday": "08:00 - 16:30 WIB",
        "saturday": "08:00 - 14:00 WIB",
        "sunday": "Tutup"
      },
      "office_notes": "Pada hari libur nasional, kantor tutup"
    },
    "social_media": {
      "facebook": "https://facebook.com/lpmaarifnu",
      "twitter": "https://twitter.com/lpmaarifnu",
      "instagram": "https://instagram.com/lpmaarifnu",
      "youtube": "https://youtube.com/@lpmaarifnu"
    }
  }
}
```

## Frontend Implementation

### Current Status

✅ **Contact Page** (`src/app/kontak/page.js`)
- Server-side rendering
- Fetches settings from API
- Displays contact info and form
- Includes map integration
- Shows office hours

✅ **Contact Form** (`src/components/contact/ContactForm.jsx`)
- Client-side validation
- Error handling
- Loading states
- Success/error messages
- Ready for API integration

✅ **Contact Info** (`src/components/contact/ContactInfo.jsx`)
- Displays contact details from settings
- Social media links
- Responsive design

### Form Validation

Frontend validates:
- ✅ Name (required)
- ✅ Email (required, valid format)
- ✅ Phone (required, valid format)
- ✅ Subject (required)
- ✅ Message (required, min 10 characters)

## API Integration Instructions

### Backend Implementation Steps

1. **Create Database Table**
   ```sql
   -- Run the schema provided above
   ```

2. **Implement POST Endpoint**
   ```go
   // Example structure in Go
   type ContactRequest struct {
       Name    string `json:"name" validate:"required,min=3"`
       Email   string `json:"email" validate:"required,email"`
       Phone   string `json:"phone" validate:"required"`
       Subject string `json:"subject" validate:"required,min=5"`
       Message string `json:"message" validate:"required,min=10,max=1000"`
   }
   ```

3. **Add Email Notification** (Optional but recommended)
   - Send email to admin when new message received
   - Send auto-reply to sender
   - Use email templates

4. **Rate Limiting** (Recommended)
   - Limit submissions per IP: 5 per hour
   - Prevent spam and abuse

5. **Admin Panel Features** (Future)
   - View all messages
   - Filter by status
   - Reply to messages
   - Mark as read/archived
   - Export to CSV

### Frontend Integration

When backend is ready, update `ContactForm.jsx`:

```javascript
// Remove the mock API call simulation
// Uncomment the actual API call (lines marked with TODO)

const response = await fetch('/api/v1/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(formData),
});

const data = await response.json();

if (!response.ok) {
  throw new Error(data.message || 'Gagal mengirim pesan');
}

// Handle success...
```

## Security Considerations

### Backend Implementation

1. **Input Validation**
   - Sanitize all inputs
   - Validate email format
   - Check phone number format
   - Limit message length

2. **Rate Limiting**
   - IP-based rate limiting
   - CAPTCHA for high-risk scenarios
   - Honeypot fields

3. **Data Protection**
   - Store IP for tracking
   - Encrypt sensitive data
   - GDPR compliance considerations

4. **Spam Prevention**
   - Implement CAPTCHA (reCAPTCHA v3)
   - Check for suspicious patterns
   - Blacklist abusive IPs

### Example Rate Limiting

```go
// Pseudocode
if submissions_in_last_hour(ip_address) > 5 {
    return error("Too many submissions. Please try again later.")
}
```

## Email Template Suggestions

### Admin Notification Email

```
Subject: New Contact Message from Website

Name: [name]
Email: [email]
Phone: [phone]
Subject: [subject]

Message:
[message]

---
Received: [timestamp]
IP Address: [ip]
```

### Auto-Reply Email

```
Subject: We've Received Your Message - LP Ma'arif NU

Dear [name],

Thank you for contacting LP Ma'arif NU. We have received your message and will respond within 1-2 business days.

Your message:
Subject: [subject]
[message]

Best regards,
LP Ma'arif NU Team
```

## Testing

### Manual Testing

1. **Test Form Validation**
   - Submit with empty fields
   - Submit with invalid email
   - Submit with short message
   - Verify error messages

2. **Test Success Flow**
   - Fill valid data
   - Submit form
   - Verify success message
   - Check form reset

3. **Test API Integration**
   ```bash
   curl -X POST http://localhost:8080/api/v1/contact \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Test User",
       "email": "test@example.com",
       "phone": "08123456789",
       "subject": "Test Message",
       "message": "This is a test message to verify the API works correctly."
     }'
   ```

### Automated Testing

```javascript
// Example test cases
describe('Contact Form', () => {
  it('should validate required fields', () => {
    // Test validation
  });

  it('should submit form successfully', () => {
    // Test submission
  });

  it('should show error on API failure', () => {
    // Test error handling
  });
});
```

## API Implementation Checklist

- [ ] Create `contact_messages` table in database
- [ ] Implement POST /api/v1/contact endpoint
- [ ] Add input validation
- [ ] Implement rate limiting
- [ ] Add email notification to admin
- [ ] Add auto-reply email to sender
- [ ] Implement CAPTCHA (optional)
- [ ] Add admin panel for viewing messages
- [ ] Implement reply functionality
- [ ] Add message status tracking
- [ ] Implement soft delete
- [ ] Add unit tests
- [ ] Add integration tests
- [ ] Update settings endpoint with office_hours

## Future Enhancements

1. **File Attachments**
   - Allow users to attach documents
   - File size and type validation
   - Virus scanning

2. **Live Chat Integration**
   - WebSocket for real-time chat
   - Online/offline status
   - Chat history

3. **FAQ Section**
   - Common questions
   - Search functionality
   - Categories

4. **Multi-language Support**
   - Indonesian and English
   - Auto-detect language
   - Translation API

5. **Analytics**
   - Track message topics
   - Response time metrics
   - User satisfaction surveys

## Support

For questions or issues:
1. Check this documentation
2. Review implementation files
3. Contact development team

---

**Status**: ✅ Frontend Complete | ⏳ Backend Pending
**Last Updated**: 2024-01-13

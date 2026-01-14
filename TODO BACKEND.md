# TODO BACKEND - LP Ma'arif NU Website API

## 📋 Overview
Dokumen ini berisi requirement lengkap untuk backend API yang dibutuhkan oleh website LP Ma'arif NU. API ini akan menggantikan mock data yang saat ini digunakan di frontend.

---

## 🎯 Base URL
```
Production: https://api.lpmaarifnu.or.id/v1
Development: http://localhost:3000/api/v1
```

---

## 📌 Authentication
### Header Requirements
```
Authorization: Bearer {token}
Content-Type: application/json
```

### Admin Authentication Endpoints
- `POST /auth/login` - Login admin
- `POST /auth/logout` - Logout admin
- `POST /auth/refresh` - Refresh token
- `GET /auth/me` - Get current admin info

---

## 🗂️ API Endpoints

### 1. BERITA (News Articles)

#### 1.1 Get All News Articles
```
GET /news
```

**Query Parameters:**
- `category` (optional): Filter by category slug (nasional, daerah, program)
- `page` (optional, default: 1): Page number
- `limit` (optional, default: 10): Items per page
- `search` (optional): Search by title or content
- `sort` (optional, default: -date): Sort field (date, title)
- `tags` (optional): Filter by tags (comma separated)

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "articles": [
      {
        "id": "string",
        "title": "string",
        "slug": "string",
        "excerpt": "string",
        "content": "string (HTML)",
        "image": "string (URL)",
        "date": "string (ISO 8601)",
        "category": "string",
        "categorySlug": "string",
        "author": "string",
        "tags": ["string"],
        "views": "number",
        "createdAt": "string (ISO 8601)",
        "updatedAt": "string (ISO 8601)"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 10,
      "totalItems": 100,
      "itemsPerPage": 10
    }
  }
}
```

#### 1.2 Get Single News Article
```
GET /news/:slug
```

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "title": "string",
    "slug": "string",
    "excerpt": "string",
    "content": "string (HTML)",
    "image": "string (URL)",
    "date": "string (ISO 8601)",
    "category": "string",
    "categorySlug": "string",
    "author": "string",
    "tags": ["string"],
    "views": "number",
    "relatedArticles": [
      {
        "id": "string",
        "title": "string",
        "slug": "string",
        "excerpt": "string",
        "image": "string (URL)",
        "date": "string (ISO 8601)"
      }
    ],
    "createdAt": "string (ISO 8601)",
    "updatedAt": "string (ISO 8601)"
  }
}
```

#### 1.3 Create News Article (Admin)
```
POST /news
Authorization: Required
```

**Request Body:**
```json
{
  "title": "string (required)",
  "excerpt": "string (required)",
  "content": "string (required, HTML)",
  "image": "string (required, URL or base64)",
  "categorySlug": "string (required)",
  "tags": ["string"],
  "publishDate": "string (ISO 8601, optional)"
}
```

#### 1.4 Update News Article (Admin)
```
PUT /news/:id
Authorization: Required
```

#### 1.5 Delete News Article (Admin)
```
DELETE /news/:id
Authorization: Required
```

---

### 2. OPINI (Opinion Articles)

#### 2.1 Get All Opinion Articles
```
GET /opinions
```

**Query Parameters:**
- `limit` (optional, default: 10): Items per page
- `page` (optional, default: 1): Page number
- `search` (optional): Search by title
- `tags` (optional): Filter by tags

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "articles": [
      {
        "id": "string",
        "title": "string",
        "slug": "string",
        "excerpt": "string",
        "content": "string (HTML)",
        "image": "string (URL)",
        "date": "string (ISO 8601)",
        "author": "string",
        "authorTitle": "string",
        "authorImage": "string (URL)",
        "tags": ["string"],
        "views": "number",
        "createdAt": "string (ISO 8601)",
        "updatedAt": "string (ISO 8601)"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 50,
      "itemsPerPage": 10
    }
  }
}
```

#### 2.2 Get Single Opinion Article
```
GET /opinions/:slug
```

#### 2.3 Create Opinion Article (Admin)
```
POST /opinions
Authorization: Required
```

**Request Body:**
```json
{
  "title": "string (required)",
  "excerpt": "string (required)",
  "content": "string (required, HTML)",
  "image": "string (required, URL or base64)",
  "author": "string (required)",
  "authorTitle": "string (required)",
  "authorImage": "string (required, URL or base64)",
  "tags": ["string"]
}
```

#### 2.4 Update Opinion Article (Admin)
```
PUT /opinions/:id
Authorization: Required
```

#### 2.5 Delete Opinion Article (Admin)
```
DELETE /opinions/:id
Authorization: Required
```

---

### 3. DOKUMEN (Documents)

#### 3.1 Get All Documents
```
GET /documents
```

**Query Parameters:**
- `category` (optional): Filter by category (Pedoman, Kurikulum, Regulasi, Panduan, Formulir)
- `search` (optional): Search by title or description
- `page` (optional, default: 1): Page number
- `limit` (optional, default: 20): Items per page
- `sort` (optional): Sort by (date, title, downloads)

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "documents": [
      {
        "id": "number",
        "title": "string",
        "description": "string",
        "category": "string",
        "fileType": "string",
        "fileSize": "string",
        "fileName": "string",
        "downloadUrl": "string",
        "uploadDate": "string (ISO 8601)",
        "downloads": "number",
        "uploadedBy": "string",
        "createdAt": "string (ISO 8601)",
        "updatedAt": "string (ISO 8601)"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 10,
      "totalItems": 100,
      "itemsPerPage": 20
    }
  }
}
```

#### 3.2 Get Single Document
```
GET /documents/:id
```

#### 3.3 Download Document
```
GET /documents/:id/download
```

**Response:** File stream

#### 3.4 Upload Document (Admin)
```
POST /documents
Authorization: Required
Content-Type: multipart/form-data
```

**Request Body (multipart/form-data):**
```
title: string (required)
description: string (required)
category: string (required)
file: file (required)
```

#### 3.5 Update Document (Admin)
```
PUT /documents/:id
Authorization: Required
```

#### 3.6 Delete Document (Admin)
```
DELETE /documents/:id
Authorization: Required
```

---

### 4. HERO SLIDER (Home Page)

#### 4.1 Get All Hero Slides
```
GET /hero-slides
```

**Query Parameters:**
- `active` (optional): Filter by active status (true/false)

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "slides": [
      {
        "id": "string",
        "title": "string",
        "description": "string",
        "image": "string (URL)",
        "cta": {
          "label": "string",
          "href": "string",
          "secondary": {
            "label": "string",
            "href": "string"
          }
        },
        "order": "number",
        "active": "boolean",
        "createdAt": "string (ISO 8601)",
        "updatedAt": "string (ISO 8601)"
      }
    ]
  }
}
```

#### 4.2 Create Hero Slide (Admin)
```
POST /hero-slides
Authorization: Required
```

#### 4.3 Update Hero Slide (Admin)
```
PUT /hero-slides/:id
Authorization: Required
```

#### 4.4 Delete Hero Slide (Admin)
```
DELETE /hero-slides/:id
Authorization: Required
```

#### 4.5 Reorder Hero Slides (Admin)
```
PUT /hero-slides/reorder
Authorization: Required
```

**Request Body:**
```json
{
  "slides": [
    {
      "id": "string",
      "order": "number"
    }
  ]
}
```

---

### 5. ORGANISASI (Organization)

#### 5.1 Get Organization Structure
```
GET /organization/structure
```

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "ketua": {
      "nama": "string",
      "jabatan": "string",
      "image": "string (URL)",
      "bio": "string"
    },
    "wakil": [
      {
        "nama": "string",
        "jabatan": "string",
        "image": "string (URL)",
        "bio": "string"
      }
    ],
    "sekretaris": {
      "nama": "string",
      "jabatan": "string",
      "image": "string (URL)",
      "bio": "string"
    },
    "bendahara": {
      "nama": "string",
      "jabatan": "string",
      "image": "string (URL)",
      "bio": "string"
    },
    "bidang": [
      {
        "nama": "string",
        "ketua": "string",
        "deskripsi": "string"
      }
    ]
  }
}
```

#### 5.2 Get All Board Members
```
GET /organization/board-members
```

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "members": [
      {
        "id": "number",
        "nama": "string",
        "jabatan": "string",
        "foto": "string (URL)",
        "bio": "string",
        "email": "string",
        "telepon": "string",
        "order": "number",
        "createdAt": "string (ISO 8601)",
        "updatedAt": "string (ISO 8601)"
      }
    ]
  }
}
```

#### 5.3 Update Organization Structure (Admin)
```
PUT /organization/structure
Authorization: Required
```

#### 5.4 Update Board Member (Admin)
```
PUT /organization/board-members/:id
Authorization: Required
```

---

### 6. CONTENT PAGES (Static Content)

#### 6.1 Get Page Content
```
GET /pages/:slug
```

**Available slugs:**
- `visi-misi`
- `sejarah`
- `program-strategis`
- `pramuka`

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "slug": "string",
    "title": "string",
    "content": "string (HTML or JSON)",
    "metadata": "object (flexible based on page type)",
    "updatedAt": "string (ISO 8601)"
  }
}
```

**Example for Visi-Misi:**
```json
{
  "success": true,
  "data": {
    "slug": "visi-misi",
    "title": "Visi & Misi",
    "content": {
      "visi": "string",
      "misi": ["string"],
      "nilaiNilai": [
        {
          "title": "string",
          "description": "string"
        }
      ]
    },
    "updatedAt": "2024-12-15T10:00:00Z"
  }
}
```

#### 6.2 Update Page Content (Admin)
```
PUT /pages/:slug
Authorization: Required
```

---

### 7. MEDIA & UPLOADS

#### 7.1 Upload Image
```
POST /media/upload
Authorization: Required
Content-Type: multipart/form-data
```

**Request Body:**
```
file: file (required)
folder: string (optional, e.g., news, opinions, profiles)
```

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "url": "string",
    "fileName": "string",
    "fileSize": "number",
    "mimeType": "string",
    "width": "number",
    "height": "number"
  }
}
```

#### 7.2 Get All Media
```
GET /media
Authorization: Required
```

#### 7.3 Delete Media
```
DELETE /media/:id
Authorization: Required
```

---

### 8. SETTINGS

#### 8.1 Get All Settings
```
GET /settings
```

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "siteName": "string",
    "siteDescription": "string",
    "logo": "string (URL)",
    "favicon": "string (URL)",
    "contactEmail": "string",
    "contactPhone": "string",
    "address": "string",
    "socialMedia": {
      "facebook": "string",
      "twitter": "string",
      "instagram": "string",
      "youtube": "string"
    },
    "statistics": {
      "totalArticles": "number",
      "totalDocuments": "number"
    }
  }
}
```

#### 8.2 Update Settings (Admin)
```
PUT /settings
Authorization: Required
```

---

### 9. ANALYTICS

#### 9.1 Get Website Statistics
```
GET /analytics/stats
Authorization: Required
```

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "totalViews": "number",
    "totalArticles": "number",
    "totalOpinions": "number",
    "totalDocuments": "number",
    "totalDownloads": "number",
    "popularArticles": [
      {
        "id": "string",
        "title": "string",
        "views": "number"
      }
    ],
    "popularDocuments": [
      {
        "id": "number",
        "title": "string",
        "downloads": "number"
      }
    ]
  }
}
```

---

## 🔧 Database Schema Requirements

### Tables Needed:

1. **users** - Admin users
2. **news_articles** - Berita/News
3. **opinion_articles** - Opini
4. **documents** - Dokumen/Files
5. **hero_slides** - Home slider
6. **organization_structure** - Struktur organisasi
7. **board_members** - Susunan pengurus
8. **pages** - Static content pages
9. **media** - Uploaded files/images
10. **settings** - Website settings
11. **categories** - Article categories
12. **tags** - Article tags

---

## 📝 Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "error": {
    "code": "string",
    "message": "string",
    "details": "object (optional)"
  }
}
```

**Common Error Codes:**
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error
- `500` - Internal Server Error

---

## 🔒 Security Requirements

1. **Authentication**: JWT-based authentication
2. **Authorization**: Role-based access control (Admin, Super Admin)
3. **Rate Limiting**: 100 requests per minute for public APIs
4. **Input Validation**: Validate all inputs
5. **SQL Injection Protection**: Use parameterized queries
6. **XSS Protection**: Sanitize HTML content
7. **File Upload**:
   - Max size: 10MB for images, 50MB for documents
   - Allowed types: jpg, png, webp for images; pdf, doc, docx, xls, xlsx for documents
8. **CORS**: Configure allowed origins

---

## 🚀 Implementation Priority

### Phase 1 (Critical - MVP):
1. ✅ Authentication endpoints
2. ✅ News Articles CRUD
3. ✅ Documents (Read + Download)
4. ✅ Settings (Read only)

### Phase 2 (Important):
5. ✅ Opinion Articles CRUD
6. ✅ Hero Slides CRUD
7. ✅ Media Upload
8. ✅ Documents CRUD

### Phase 3 (Enhancement):
9. ✅ Organization Structure
10. ✅ Analytics
11. ✅ Content Pages

---

## 📊 Performance Requirements

1. **Response Time**: < 200ms for most endpoints
2. **Pagination**: Default 10-20 items per page
3. **Caching**: Implement Redis for frequently accessed data
4. **Image Optimization**: Auto-resize and compress uploaded images
5. **Database Indexing**: Index on frequently queried fields (slug, category, date)

---

## 🧪 Testing Requirements

1. Unit tests for all business logic
2. Integration tests for all endpoints
3. API documentation with Swagger/OpenAPI
4. Postman collection for all endpoints
5. Load testing for critical endpoints

---

## 📚 Documentation

Required documentation:
1. API Reference (Swagger/OpenAPI)
2. Database Schema Diagram
3. Setup/Installation Guide
4. Deployment Guide
5. Admin User Manual

---

## 🛠️ Tech Stack Recommendations

**Backend Framework:**
- Node.js + Express.js
- Python + FastAPI
- PHP + Laravel
- Go + Gin

**Database:**
- PostgreSQL (Recommended)
- MySQL/MariaDB
- MongoDB (for flexible content)

**Storage:**
- AWS S3 / Digital Ocean Spaces (for media files)
- Local storage for development

**Caching:**
- Redis

**Search:**
- Elasticsearch (for advanced search)
- PostgreSQL Full Text Search

---

## 📞 Support & Contact

For questions about API requirements:
- Create issue in repository
- Contact: dev@lpmaarifnu.or.id

---

**Last Updated:** 2025-01-11
**Version:** 1.0.0

# TODO: Backend API Extension

Dokumentasi ini berisi daftar API endpoint yang perlu dikembangkan untuk menggantikan data hardcoded/mocking di frontend.

**⚠️ CATATAN PENTING:**
- **Data Satuan Pendidikan** sekarang memiliki dokumentasi API terpisah: `TODO BACKEND - SATUAN PENDIDIKAN API.md`
- **Home Features** tidak diperlukan (data hardcoded di frontend)
- Dokumentasi detail untuk API extension ada di: `TODO BACKEND EXTEND - READ ONLY API.md`

## Status Implementasi API

### ✅ Sudah Diimplementasikan
- Hero Slides (`GET /api/hero-slides`)
- Featured News (`GET /api/articles/featured`)
- Opinion Articles (`GET /api/articles/opini`)
- Event Flayers (`GET /api/event-flayers`)
- News Articles (`GET /api/articles`)
- Documents (`GET /api/documents`)
- Settings/Contact Info (`GET /api/settings`)
- Pages (Generic) (`GET /api/pages/{slug}`)
- Organization Structure (`GET /api/organization/structure`)

---

## 🔄 Perlu Dikembangkan/Diperluas

### 1. **Home Page Features**
**Endpoint:** `GET /api/home/features`

**Deskripsi:** Data fitur unggulan yang ditampilkan di homepage

**Response Format:**
```json
{
  "features": [
    {
      "id": 1,
      "icon": "Newspaper",
      "title": "Berita Terkini",
      "description": "Update informasi dan kegiatan terbaru LP Ma'arif NU",
      "href": "/berita",
      "color": "text-blue-600",
      "bg_color": "bg-blue-50",
      "order": 1,
      "is_active": true
    }
  ]
}
```

**Table:** `home_features`

---

### 2. **Data Satuan Pendidikan (Satpen)**
**Endpoint:** `GET /api/satpen`

**Query Parameters:**
- `page` (int): Halaman pagination
- `limit` (int): Jumlah data per halaman
- `jenjang` (string): Filter berdasarkan jenjang (MI/MTs/MA/Pesantren)
- `provinsi` (string): Filter berdasarkan provinsi
- `search` (string): Pencarian nama satpen

**Response Format:**
```json
{
  "satpen": [
    {
      "id": 1,
      "npsn": "12345678",
      "nama": "MI Ma'arif NU 01 Jakarta",
      "jenjang": "MI",
      "alamat": "Jl. Raya No. 123",
      "kabupaten": "Jakarta Timur",
      "provinsi": "DKI Jakarta",
      "kepala_sekolah": "Dr. Ahmad Yusuf",
      "jumlah_siswa": 450,
      "akreditasi": "A",
      "latitude": -6.2088,
      "longitude": 106.8456,
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 14000,
    "total_pages": 700
  },
  "statistics": {
    "total_satpen": 14000,
    "total_provinsi": 34,
    "total_siswa": 2500000
  }
}
```

**Table:** `satuan_pendidikan`

---

### 3. **Susunan Pengurus**
**Endpoint:** `GET /api/organization/pengurus`

**Deskripsi:** Data susunan pengurus LP Ma'arif NU

**Response Format:**
```json
{
  "periode": "2024-2029",
  "pengurus": [
    {
      "id": 1,
      "nama": "Prof. Dr. KH. Said Aqil Siradj, MA",
      "jabatan": "Ketua Umum",
      "foto": "https://example.com/photo.jpg",
      "bio": "Deskripsi singkat",
      "email": "email@example.com",
      "phone": "081234567890",
      "order": 1,
      "kategori": "pimpinan_utama"
    },
    {
      "id": 2,
      "nama": "Dr. H. Ahmad Lutfi, M.Pd",
      "jabatan": "Wakil Ketua I",
      "foto": "https://example.com/photo2.jpg",
      "bio": "Deskripsi singkat",
      "order": 2,
      "kategori": "pimpinan_utama"
    }
  ]
}
```

**Table:** `pengurus`

---

### 4. **Susunan Redaktur**
**Endpoint:** `GET /api/editorial/team`

**Deskripsi:** Data tim redaksi website dan publikasi

**Response Format:**
```json
{
  "editorial": {
    "pemimpin_redaksi": {
      "name": "Dr. H. Muhammad Fadhil, M.Pd",
      "title": "Pemimpin Redaksi",
      "photo": "https://example.com/photo.jpg",
      "bio": "Pakar pendidikan Islam...",
      "email": "fadhil@lpmaarifnu.or.id",
      "phone": "021-12345678"
    },
    "wakil_pemimpin_redaksi": [
      {
        "name": "Dra. Hj. Nur Azizah, M.Si",
        "title": "Wakil Pemimpin Redaksi I",
        "photo": "https://example.com/photo.jpg",
        "bio": "Spesialis media...",
        "email": "azizah@lpmaarifnu.or.id"
      }
    ],
    "redaktur_pelaksana": {
      "name": "Ahmad Syarif, S.Sos, M.I.Kom",
      "title": "Redaktur Pelaksana",
      "photo": "https://example.com/photo.jpg",
      "bio": "Koordinator harian...",
      "email": "syarif@lpmaarifnu.or.id"
    },
    "dewan_redaksi": [
      {
        "name": "Prof. Dr. KH. Abdullah Shiddiq, MA",
        "institution": "UIN Syarif Hidayatullah Jakarta",
        "expertise": "Pendidikan Islam & Budaya",
        "photo": "https://example.com/photo.jpg"
      }
    ],
    "tim_redaksi": [
      {
        "name": "Rizki Aulia Rahman, S.Pd",
        "position": "Editor Berita",
        "photo": "https://example.com/photo.jpg"
      }
    ]
  },
  "contact": {
    "email": "redaksi@lpmaarifnu.or.id",
    "phone": "021-12345678"
  }
}
```

**Tables:**
- `editorial_team`
- `editorial_council`

---

### 5. **Contact Form Submission**
**Endpoint:** `POST /api/contact/submit`

**Deskripsi:** Menerima data dari contact form

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "081234567890",
  "subject": "Pertanyaan tentang pendaftaran",
  "message": "Saya ingin menanyakan..."
}
```

**Response Format:**
```json
{
  "success": true,
  "message": "Pesan Anda telah terkirim. Kami akan segera menghubungi Anda.",
  "ticket_id": "CTK-2024-0001"
}
```

**Table:** `contact_messages`

---

### 6. **Provinsi List untuk Filter**
**Endpoint:** `GET /api/master/provinsi`

**Deskripsi:** Daftar provinsi untuk filter di halaman Data Satpen

**Response Format:**
```json
{
  "provinsi": [
    {
      "id": 1,
      "nama": "DKI Jakarta",
      "kode": "31",
      "jumlah_satpen": 350
    },
    {
      "id": 2,
      "nama": "Jawa Barat",
      "kode": "32",
      "jumlah_satpen": 2100
    }
  ]
}
```

**Table:** `provinsi`

---

## 📋 Checklist Implementasi

### API Endpoints
- [ ] `GET /api/home/features` - Home page features
- [ ] `GET /api/satpen` - Data satuan pendidikan
- [ ] `GET /api/organization/pengurus` - Susunan pengurus
- [ ] `GET /api/editorial/team` - Susunan redaktur
- [ ] `POST /api/contact/submit` - Submit contact form
- [ ] `GET /api/master/provinsi` - Daftar provinsi

### Database Tables
- [ ] `home_features` - Fitur homepage
- [ ] `satuan_pendidikan` - Data satpen
- [ ] `provinsi` - Master provinsi
- [ ] `pengurus` - Susunan pengurus
- [ ] `editorial_team` - Tim redaksi
- [ ] `editorial_council` - Dewan redaksi
- [ ] `contact_messages` - Pesan dari contact form

### Seeders
- [ ] Home features seeder
- [ ] Satuan pendidikan seeder (sample data)
- [ ] Provinsi master seeder
- [ ] Pengurus seeder
- [ ] Editorial team seeder
- [ ] Contact messages seeder (sample)

---

## 📝 Notes

### Prioritas Implementasi
1. **High Priority:**
   - Data Satpen API (most requested feature)
   - Contact Form Submission
   - Provinsi Master Data

2. **Medium Priority:**
   - Susunan Pengurus API
   - Susunan Redaktur API
   - Home Features API

3. **Low Priority:**
   - Extended analytics endpoints
   - Advanced filtering options

### Catatan Teknis
- Semua endpoint harus support CORS untuk frontend Next.js
- Implementasi rate limiting untuk endpoint contact form
- Data satpen perlu indexing untuk performa search
- Cache data provinsi karena jarang berubah
- Upload foto pengurus/redaktur perlu storage solution (S3/local)

### API Yang Sudah Ada Tapi Perlu Diperluas
- `GET /api/pages/{slug}` - Sudah ada, pastikan support untuk:
  - `pramuka` slug
  - `program-strategis` slug
  - `visi-misi` slug
  - `sejarah` slug

---

## 🔗 Related Documentation
- [API Documentation](./API_DOCUMENTATION.md)
- [Database Schema](./database_schema.sql)
- [Database Seeder](./database_seeder.sql)

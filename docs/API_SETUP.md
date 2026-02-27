# API Setup & Configuration

## Masalah yang Ditemukan ✅

### 1. Error 502 Bad Gateway (SOLVED)
**Penyebab:** Struktur URL API yang salah

- ❌ **URL Salah:** `http://api.maarifnu.or.id/site/news`
- ✅ **URL Benar:** `http://api.maarifnu.or.id/site/api/v1/news`
- ✅ **URL Benar:** `http://api.maarifnu.or.id/sipinter/api/v1/satpen`

### 2. CORS Status
**CORS sudah DIKONFIGURASI dengan benar di server!** ✅

Headers yang ada:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS
Access-Control-Allow-Headers: DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization
Access-Control-Allow-Credentials: true
```

**Kesimpulan:** Masalah bukan CORS, tapi struktur URL yang salah!

## Solusi yang Diterapkan

### 1. Konfigurasi Base URL
File: `src/lib/api-config.js`

```javascript
const API_CONFIGS = {
  // Site API - untuk endpoint umum
  site: 'http://api.maarifnu.or.id/site/api/v1',

  // Satpen API - untuk satpen, provinsi, kabupaten
  satpen: 'http://api.maarifnu.or.id/sipinter/api/v1',
};
```

### 2. Routing Endpoint
- **Satpen, Provinsi, Kabupaten** → `http://api.maarifnu.or.id/sipinter/api/v1/`
- **News, Opinions, Documents, dll** → `http://api.maarifnu.or.id/site/api/v1/`

### 3. Next.js Rewrites (untuk Development)
File: `next.config.mjs`

Untuk development, comment `output: 'export'` agar rewrites bekerja:

```javascript
// output: 'export', // Comment untuk development
```

Rewrites akan proxy request:
```
/api/site/* → http://api.maarifnu.or.id/site/*
/api/sipinter/* → http://api.maarifnu.or.id/sipinter/*
```

## Environment Variables

### .env.local
```env
# Site API
NEXT_PUBLIC_API_URL_SITE=http://api.maarifnu.or.id/site/api/v1

# Satpen API
NEXT_PUBLIC_API_URL_SATPEN=http://api.maarifnu.or.id/sipinter/api/v1
```

## Testing API

### Test dengan cURL

```bash
# Test Satpen API
curl "http://api.maarifnu.or.id/sipinter/api/v1/satpen?limit=1"

# Test Provinsi API
curl "http://api.maarifnu.or.id/sipinter/api/v1/provinsi"

# Test Kabupaten API
curl "http://api.maarifnu.or.id/sipinter/api/v1/kabupaten?provinsi_id=1"

# Test Site API (jika sudah aktif)
curl "http://api.maarifnu.or.id/site/api/v1/news?limit=1"
```

### Test di Browser Console

```javascript
// Test Satpen
fetch('http://api.maarifnu.or.id/sipinter/api/v1/satpen?limit=1')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error);

// Test Provinsi
fetch('http://api.maarifnu.or.id/sipinter/api/v1/provinsi')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error);
```

## Development vs Production

### Development
1. Comment `output: 'export'` di `next.config.mjs`
2. Restart dev server: `npm run dev`
3. Request akan di-proxy melalui Next.js server
4. Tidak ada CORS error

### Production Build
1. Uncomment `output: 'export'` di `next.config.mjs`
2. Build: `npm run build`
3. Direct request ke API server
4. CORS sudah dikonfigurasi di server, jadi aman

## URL Structure Reference

### Correct API URLs

| Endpoint | Full URL |
|----------|----------|
| Satpen List | `http://api.maarifnu.or.id/sipinter/api/v1/satpen` |
| Satpen by ID | `http://api.maarifnu.or.id/sipinter/api/v1/satpen/:id` |
| Satpen Statistics | `http://api.maarifnu.or.id/sipinter/api/v1/satpen/statistics` |
| Provinsi List | `http://api.maarifnu.or.id/sipinter/api/v1/provinsi` |
| Provinsi by ID | `http://api.maarifnu.or.id/sipinter/api/v1/provinsi/:id` |
| Kabupaten List | `http://api.maarifnu.or.id/sipinter/api/v1/kabupaten` |
| Kabupaten by ID | `http://api.maarifnu.or.id/sipinter/api/v1/kabupaten/:id` |
| News | `http://api.maarifnu.or.id/site/api/v1/news` |
| Opinions | `http://api.maarifnu.or.id/site/api/v1/opinions` |

### API Gateway Structure

```
http://api.maarifnu.or.id/
├── site/
│   └── api/v1/
│       ├── news
│       ├── opinions
│       ├── documents
│       ├── hero-slides
│       └── ...
└── sipinter/
    └── api/v1/
        ├── satpen
        ├── provinsi
        ├── kabupaten
        └── pengurus-cabang
```

## Troubleshooting

### Error: 502 Bad Gateway
- ✅ **Solved:** Gunakan `/api/v1/` di URL
- Pastikan URL lengkap: `http://api.maarifnu.or.id/sipinter/api/v1/satpen`

### Error: 404 Not Found
- Periksa endpoint path
- Pastikan menggunakan base URL yang benar (site vs sipinter)

### CORS Error (seharusnya tidak terjadi)
- Server sudah mengaktifkan CORS
- Jika masih error, gunakan Next.js rewrites (development mode)

## Files Modified

1. ✅ `src/lib/api-config.js` - Base URL configuration
2. ✅ `next.config.mjs` - Next.js rewrites untuk development
3. ✅ `.env.local` - Environment variables
4. ✅ `.env.local.example` - Example environment variables
5. ✅ `src/lib/api.js` - API client menggunakan getBaseURL()

## Quick Start

```bash
# 1. Setup environment
cp .env.local.example .env.local

# 2. Install dependencies
npm install

# 3. Start development (dengan proxy)
# Comment 'output: export' di next.config.mjs
npm run dev

# 4. Test API
# Buka http://localhost:3000/data-satpen
```

## Summary

✅ **Problem:** URL structure was wrong
✅ **Solution:** Use `/api/v1/` in all API URLs
✅ **CORS:** Already configured on server
✅ **Status:** Working perfectly!

**Endpoint Examples:**
- Satpen: `http://api.maarifnu.or.id/sipinter/api/v1/satpen?limit=10`
- Provinsi: `http://api.maarifnu.or.id/sipinter/api/v1/provinsi`
- Kabupaten: `http://api.maarifnu.or.id/sipinter/api/v1/kabupaten?provinsi_id=1`

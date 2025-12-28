/**
 * Mock API functions for fetching data
 * In production, replace these with actual API calls
 */

// Mock data - Berita
const newsArticles = [
  {
    id: '1',
    title: 'Peluncuran Program Beasiswa Pendidikan 2024',
    excerpt: 'LP Ma\'arif NU meluncurkan program beasiswa untuk siswa berprestasi dari keluarga kurang mampu di seluruh Indonesia',
    content: `<p>Jakarta - LP Ma'arif NU PBNU resmi meluncurkan Program Beasiswa Pendidikan 2024 yang menargetkan bantuan pendidikan untuk 1000 siswa berprestasi dari keluarga kurang mampu di seluruh Indonesia.</p>
    <p>Program ini merupakan wujud komitmen LP Ma'arif NU dalam mewujudkan pendidikan berkualitas yang merata dan terjangkau bagi seluruh lapisan masyarakat. Beasiswa ini mencakup biaya pendidikan penuh mulai dari tingkat SD hingga SMA/MA.</p>
    <p>"Kami ingin memastikan tidak ada anak bangsa yang kehilangan kesempatan untuk mendapatkan pendidikan berkualitas hanya karena keterbatasan ekonomi," ujar Ketua Umum LP Ma'arif NU dalam acara peluncuran.</p>`,
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&h=800&fit=crop',
    date: '2024-12-15',
    category: 'Program',
    categorySlug: 'program',
    author: 'Admin LP Ma\'arif',
    slug: 'peluncuran-program-beasiswa-2024',
    tags: ['beasiswa', 'pendidikan', 'program'],
  },
  {
    id: '2',
    title: 'Rakernas LP Ma\'arif NU 2024 Sukses Digelar',
    excerpt: 'Rapat Kerja Nasional membahas strategi pengembangan pendidikan Ma\'arif di era digital dengan partisipasi seluruh pengurus wilayah',
    content: `<p>Surabaya - Rapat Kerja Nasional (Rakernas) LP Ma'arif NU 2024 telah sukses digelar dengan menghadirkan seluruh pengurus wilayah dari 34 provinsi di Indonesia.</p>
    <p>Rakernas kali ini mengangkat tema "Transformasi Digital Pendidikan Ma'arif Menuju Indonesia Emas 2045". Berbagai strategi dan program kerja disusun untuk meningkatkan kualitas pendidikan di satuan pendidikan Ma'arif.</p>`,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=800&fit=crop',
    date: '2024-12-10',
    category: 'Nasional',
    categorySlug: 'nasional',
    author: 'Tim Redaksi',
    slug: 'rakernas-lp-maarif-nu-2024',
    tags: ['rakernas', 'nasional', 'pendidikan'],
  },
  {
    id: '3',
    title: 'Pelatihan Guru Digital Learning',
    excerpt: 'Ratusan guru dari satuan pendidikan Ma\'arif mengikuti pelatihan penggunaan teknologi dalam pembelajaran',
    content: `<p>Bandung - Sebanyak 500 guru dari berbagai satuan pendidikan Ma'arif se-Jawa Barat mengikuti pelatihan Digital Learning yang diselenggarakan LP Ma'arif NU Wilayah Jawa Barat.</p>
    <p>Pelatihan ini bertujuan meningkatkan kompetensi guru dalam memanfaatkan teknologi digital untuk pembelajaran yang lebih efektif dan menarik.</p>`,
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&h=800&fit=crop',
    date: '2024-12-05',
    category: 'Daerah',
    categorySlug: 'daerah',
    author: 'Humas LP Ma\'arif Jabar',
    slug: 'pelatihan-guru-digital-learning',
    tags: ['pelatihan', 'guru', 'digital'],
  },
];

// Mock data - Opini
const opinionArticles = [
  {
    id: 'op1',
    title: 'Pendidikan Karakter di Era Digital',
    excerpt: 'Pentingnya menanamkan nilai-nilai karakter dalam pendidikan di tengah kemajuan teknologi',
    content: `<p>Di era digital yang serba cepat ini, pendidikan karakter menjadi semakin penting. Teknologi memang memberikan kemudahan akses informasi, namun tanpa pondasi karakter yang kuat, generasi muda bisa tersesat.</p>
    <p>LP Ma'arif NU memiliki peran strategis dalam mengintegrasikan nilai-nilai keislaman dengan pendidikan modern, menciptakan generasi yang cerdas sekaligus berakhlak mulia.</p>`,
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=800&fit=crop',
    date: '2024-12-12',
    author: 'Prof. Dr. Ahmad Syafii',
    authorTitle: 'Pakar Pendidikan Islam',
    authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
    slug: 'pendidikan-karakter-era-digital',
    tags: ['pendidikan', 'karakter', 'digital'],
  },
  {
    id: 'op2',
    title: 'Moderasi Beragama Melalui Pendidikan',
    excerpt: 'Peran lembaga pendidikan dalam menanamkan nilai-nilai moderasi beragama',
    content: `<p>Moderasi beragama adalah kunci kerukunan dan kemajuan bangsa. Melalui pendidikan, nilai-nilai toleransi dan saling menghormati dapat ditanamkan sejak dini.</p>`,
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&h=800&fit=crop',
    date: '2024-12-08',
    author: 'Dr. Siti Aminah',
    authorTitle: 'Peneliti Pendidikan',
    authorImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    slug: 'moderasi-beragama-pendidikan',
    tags: ['moderasi', 'agama', 'pendidikan'],
  },
];

// Mock data - Satuan Pendidikan
const satpenData = [
  {
    id: 1,
    nama: 'MA Miftahul Huda',
    jenjang: 'MA',
    provinsi: 'Jawa Timur',
    kabupaten: 'Malang',
    alamat: 'Jl. Raya Kepanjen No. 123',
    kepalaSekolah: 'Drs. Muhammad Ali, M.Pd',
    jumlahSiswa: 450,
    akreditasi: 'A',
    npsn: '20584321',
  },
  {
    id: 2,
    nama: 'MI Al-Hidayah',
    jenjang: 'MI',
    provinsi: 'Jawa Tengah',
    kabupaten: 'Semarang',
    alamat: 'Jl. Pemuda No. 45',
    kepalaSekolah: 'Hj. Fatimah, S.Pd.I',
    jumlahSiswa: 320,
    akreditasi: 'A',
    npsn: '20584322',
  },
  // Add more data...
];

// Mock data - Dokumen
const documents = [
  {
    id: 1,
    title: 'Pedoman Penyelenggaraan Pendidikan Ma\'arif',
    description: 'Panduan lengkap penyelenggaraan pendidikan di satuan pendidikan Ma\'arif',
    category: 'Pedoman',
    fileType: 'PDF',
    fileSize: '2.5 MB',
    uploadDate: '2024-11-15',
    downloadUrl: '#',
  },
  {
    id: 2,
    title: 'Kurikulum Merdeka Berbasis Ma\'arif',
    description: 'Implementasi Kurikulum Merdeka dengan nilai-nilai Ma\'arif NU',
    category: 'Kurikulum',
    fileType: 'PDF',
    fileSize: '3.2 MB',
    uploadDate: '2024-11-10',
    downloadUrl: '#',
  },
];

/**
 * Fetch news articles with optional filters
 * @param {Object} params - Query parameters
 * @returns {Promise<Array>} Array of news articles
 */
export async function getNewsArticles(params = {}) {
  const { category, limit, page = 1 } = params;

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));

  let filtered = [...newsArticles];

  if (category) {
    filtered = filtered.filter(article => article.categorySlug === category);
  }

  if (limit) {
    const start = (page - 1) * limit;
    filtered = filtered.slice(start, start + limit);
  }

  return filtered;
}

/**
 * Fetch single news article by slug
 * @param {string} slug - Article slug
 * @returns {Promise<Object|null>} Article object or null
 */
export async function getNewsArticle(slug) {
  await new Promise(resolve => setTimeout(resolve, 100));
  return newsArticles.find(article => article.slug === slug) || null;
}

/**
 * Fetch opinion articles
 * @param {Object} params - Query parameters
 * @returns {Promise<Array>} Array of opinion articles
 */
export async function getOpinionArticles(params = {}) {
  const { limit } = params;
  await new Promise(resolve => setTimeout(resolve, 100));

  let filtered = [...opinionArticles];
  if (limit) {
    filtered = filtered.slice(0, limit);
  }
  return filtered;
}

/**
 * Fetch single opinion article by slug
 * @param {string} slug - Article slug
 * @returns {Promise<Object|null>} Article object or null
 */
export async function getOpinionArticle(slug) {
  await new Promise(resolve => setTimeout(resolve, 100));
  return opinionArticles.find(article => article.slug === slug) || null;
}

/**
 * Fetch satuan pendidikan data
 * @param {Object} params - Query parameters
 * @returns {Promise<Array>} Array of satpen data
 */
export async function getSatpenData(params = {}) {
  const { jenjang, provinsi, search } = params;
  await new Promise(resolve => setTimeout(resolve, 100));

  let filtered = [...satpenData];

  if (jenjang) {
    filtered = filtered.filter(item => item.jenjang === jenjang);
  }

  if (provinsi) {
    filtered = filtered.filter(item => item.provinsi === provinsi);
  }

  if (search) {
    filtered = filtered.filter(item =>
      item.nama.toLowerCase().includes(search.toLowerCase())
    );
  }

  return filtered;
}

/**
 * Fetch documents
 * @param {Object} params - Query parameters
 * @returns {Promise<Array>} Array of documents
 */
export async function getDocuments(params = {}) {
  const { category } = params;
  await new Promise(resolve => setTimeout(resolve, 100));

  let filtered = [...documents];

  if (category) {
    filtered = filtered.filter(doc => doc.category === category);
  }

  return filtered;
}

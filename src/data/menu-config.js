/**
 * Navigation menu configuration
 * @type {Array<{label: string, href?: string, children?: Array}>}
 */
export const menuConfig = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Tentang Kami',
    children: [
      { label: 'Sejarah', href: '/tentang/sejarah' },
      { label: 'Visi-Misi', href: '/tentang/visi-misi' },
      { label: 'Struktur Organisasi', href: '/tentang/struktur-organisasi' },
      { label: 'Susunan Pengurus', href: '/tentang/susunan-pengurus' },
      { label: 'Susunan Redaktur', href: '/tentang/susunan-redaktur' },
      { label: 'Program Strategis', href: '/tentang/program-strategis' },
    ],
  },
  {
    label: 'Berita',
    children: [
      { label: 'Nasional', href: '/berita/nasional' },
      { label: 'Daerah', href: '/berita/daerah' },
    ],
  },
  {
    label: 'Opini',
    href: '/opini',
  },
  {
    label: 'Pramuka',
    href: '/pramuka',
  },
  {
    label: 'Data Satpen',
    href: '/data-satpen',
  },
  {
    label: 'Dokumen',
    href: '/dokumen',
  },
];

/**
 * Contact information
 */
export const contactInfo = {
  alamat: 'Jl. Kramat Raya No. 164, Jakarta Pusat',
  telepon: '(021) 3905460',
  email: 'lpmaarif@nu.or.id',
  social: {
    facebook: 'https://facebook.com/lpmaarifnu',
    twitter: 'https://twitter.com/lpmaarifnu',
    instagram: 'https://instagram.com/lpmaarifnu',
    youtube: 'https://youtube.com/@lpmaarifnu',
  },
};

/**
 * Organization information
 */
export const organizationInfo = {
  name: 'LP Ma\'arif NU PBNU',
  fullName: 'Lembaga Pendidikan Ma\'arif Nahdlatul Ulama Pengurus Besar Nahdlatul Ulama',
  description: 'Lembaga pendidikan di bawah naungan Pengurus Besar Nahdlatul Ulama yang berkomitmen untuk mengembangkan pendidikan Islam berkualitas di Indonesia.',
  logo: '/images/logo-lpmaarif.png',
};
